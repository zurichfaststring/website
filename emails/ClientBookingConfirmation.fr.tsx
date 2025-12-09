import { Html, Head, Body, Container, Section, Text, Link } from '@react-email/components';

interface Props {
  bookingId: string;
  clientName: string;
  bookingDate: string;
  timeSlot: string;
  racketBrand: string;
  racketModel?: string;
  stringPattern: string;
  tension: string;
  stringType: string;
  totalPrice: number;
}

export const ClientBookingConfirmationFR = (props: Props) => (
  <Html>
    <Head />
    <Body style={{fontFamily:'Arial,sans-serif',backgroundColor:'#f5f5f5',margin:0,padding:'20px 0'}}>
      <div style={{display:'none',opacity:0,fontSize:'1px',lineHeight:'1px',maxHeight:0,maxWidth:0,overflow:'hidden'}}>
        ID:{props.bookingId}|{Date.now()}
      </div>
      <Container style={{maxWidth:'500px',margin:'0 auto',backgroundColor:'#fff',borderRadius:'8px'}}>
        <Section style={{backgroundColor:'#b1cb29',padding:'20px',textAlign:'center',borderRadius:'8px 8px 0 0'}}>
          <Text style={{color:'#fff',fontSize:'20px',fontWeight:'bold',margin:0}}>Zurich Fast String</Text>
        </Section>
        
        <Section style={{padding:'20px'}}>
          <Text style={{color:'#22c55e',fontSize:'18px',fontWeight:'bold',textAlign:'center',margin:'0 0 20px'}}>
            Réservation confirmée
          </Text>
          
          <Text style={{fontSize:'14px',margin:'0 0 10px'}}>Bonjour {props.clientName},</Text>
          <Text style={{fontSize:'13px',color:'#333',margin:'0 0 20px'}}>
            Votre réservation de cordage a bien été confirmée.
          </Text>
          
          <table style={{width:'100%',margin:'20px 0',borderTop:'1px solid #ddd',borderBottom:'1px solid #ddd'}}>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666',width:'35%'}}>Date:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.bookingDate}</td></tr>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666'}}>Créneau:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.timeSlot}</td></tr>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666'}}>Raquette:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.racketBrand} {props.racketModel}</td></tr>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666'}}>Schéma:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.stringPattern}</td></tr>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666'}}>Tension:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.tension}</td></tr>
            <tr><td style={{padding:'8px 0',fontSize:'12px',color:'#666'}}>Cordage:</td><td style={{padding:'8px 0',fontSize:'12px',fontWeight:'500'}}>{props.stringType}</td></tr>
          </table>
          
          <Text style={{fontSize:'18px',fontWeight:'bold',color:'#b1cb29',textAlign:'center',margin:'20px 0 10px'}}>
            Prix total: {props.totalPrice} CHF
          </Text>
          <Text style={{fontSize:'12px',color:'#666',textAlign:'center',margin:'0 0 20px'}}>
            Paiement: TWINT ou Cash sur place
          </Text>
          
          <Section style={{backgroundColor:'#25D366',border:'3px solid #1DA851',borderRadius:'8px',padding:'20px',margin:'25px 0',textAlign:'center'}}>
            <Text style={{fontSize:'16px',fontWeight:'bold',color:'#fff',margin:'0 0 10px',textTransform:'uppercase'}}>
              ACTION REQUISE
            </Text>
            <Text style={{fontSize:'14px',color:'#fff',margin:'0 0 15px',lineHeight:'1.5'}}>
              Envoyez un message WhatsApp pour confirmer l'heure exacte de dépôt
            </Text>
            <Link href="https://wa.me/41782074677" style={{backgroundColor:'#fff',color:'#25D366',padding:'12px 30px',borderRadius:'6px',textDecoration:'none',fontSize:'14px',fontWeight:'bold',display:'inline-block',border:'2px solid #fff'}}>
              Envoyer un WhatsApp
            </Link>
            <Text style={{fontSize:'16px',fontWeight:'bold',color:'#fff',margin:'10px 0 0'}}>
              +41 78 207 46 77
            </Text>
          </Section>
          
          <Section style={{backgroundColor:'#f2f7e6',border:'2px solid #b1cb29',borderRadius:'6px',padding:'15px',margin:'20px 0',textAlign:'center'}}>
            <Text style={{fontSize:'13px',fontWeight:'bold',margin:'0 0 5px'}}>Adresse de dépôt</Text>
            <Text style={{fontSize:'12px',margin:0}}>Nordstrasse 242, 8037 Zürich</Text>
          </Section>
          
          <Text style={{fontSize:'11px',color:'#999',textAlign:'center',margin:'20px 0 0',borderTop:'1px solid #ddd',paddingTop:'15px'}}>
            Email: <Link href="mailto:info@zurichfaststring.ch" style={{color:'#b1cb29',textDecoration:'underline'}}>info@zurichfaststring.ch</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ClientBookingConfirmationFR;
