import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private stripe = Stripe('pk_test_51OgSTnFbafuC7MxDt8egQAmWMfi7XBXglYIUNmhY7hECOW0KiSf4NmmQplnel38WbNktGzF7L4D9YxMqjmQYRled00ymDPuccC');
  card: any;
  eventId!: number;
  paymentSuccess = false;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.eventId = Number(id);
      } else {
        console.error("Aucun eventId trouvé dans l'URL.");
      }
    });
    const elements = this.stripe.elements();
    this.card = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    });
    this.card.mount('#card-element');

  }

  async pay() {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error("Erreur de création du token:", error);
      return;
    }

    if (!this.eventId) {
      console.error("eventId non défini. Vérifiez l'URL.");
      return;
    }

    this.http.post('http://localhost:9091/api/reservations/save', {
      paymentToken: token.id,
      eventId: this.eventId
    }).subscribe(
      response => {
        console.log('Paiement réussi:', response);
        this.card.clear();
        this.paymentSuccess = true;
      },
      err => {
        console.error('Erreur lors du paiement:', err);
      }
    );
  }
}
