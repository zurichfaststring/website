import { Html, Head, Body, Container, Section, Text, Link } from '@react-email/components';

interface Props {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: string;
  timeSlot: string;
  racketBrand: string;
  racketModel?: string;
  stringPattern: string;
  tension: string;
  stringType: string;
  totalPrice: number;
  comments?: string;
  locale?: string;
}

export const AdminBookingNotification = (props: Props) => (
  <Html>
    <Head />
    <Body style={{fontFamily:'Arial,sans-serif',backgroundColor:'#f5f5f5',margin:0,padding:'20px 0'}}>
      <Container style={{maxWidth:'500px',margin:'0 auto',backgroundColor:'#fff',borderRadius:'8px'}}>
        <Section style={{backgroundColor:'#1f2937',padding:'20px',textAlign:'center',borderRadius:'8px 8px 0 0'}}>
          <Text style={{color:'#fff',fontSize:'20px',fontWeight:'bold',margin:0}}>Zurich Fast String</Text>
          <Text style={{color:'#9ca3af',fontSize:'12px',margin:'4px 0 0'}}>Administration</Text>
        </Section>
        
        <Section style={{backgroundColor:'#f59e0b',padding:'12px',textAlign:'center'}}>
          <Text style={{color:'#fff',fontSize:'14px',fontWeight:'bold',margin:0}}>Nouvelle réservation reçue</Text>
        </Section>
        
        <Section style={{padding:'20px'}}>
          <Text style={{fontSize:'15px',margin:'0 0 20px'}}>
            Une nouvelle réservation a été effectuée par <strong>{props.clientName}</strong>
          </Text>
          
          <Section style={{backgroundColor:'#f9fafb',borderRadius:'8px',padding:'12px',margin:'12px 0',textAlign:'center'}}>
            <Text style={{color:'#6b7280',fontSize:'11px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 6px'}}>
              Numéro de réservation
            </Text>
            <Text style={{fontSize:'12px',fontFamily:'monospace',backgroundColor:'#fff',padding:'6px 10px',borderRadius:'4px',border:'1px solid #e5e7eb',display:'inline-block',margin:0}}>
              {props.bookingId}
            </Text>
          </Section>
          
          <Section style={{backgroundColor:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'16px',margin:'12px 0'}}>
            <Text style={{fontSize:'15px',fontWeight:'bold',margin:'0 0 12px'}}>Informations client</Text>
            <table style={{width:'100%'}}>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666',width:'35%'}}>Nom:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}>{props.clientName}</td></tr>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666'}}>Email:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}><Link href={`mailto:${props.clientEmail}`} style={{color:'#b1cb29',textDecoration:'underline'}}>{props.clientEmail}</Link></td></tr>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666'}}>Téléphone:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}><Link href={`tel:${props.clientPhone}`} style={{color:'#b1cb29',textDecoration:'underline'}}>{props.clientPhone}</Link></td></tr>
            </table>
            <Section style={{textAlign:'center',marginTop:'12px'}}>
              <Link href={`https://wa.me/${props.clientPhone.replace(/[^0-9]/g, '')}`} style={{backgroundColor:'#25D366',borderRadius:'6px',color:'#fff',fontSize:'13px',fontWeight:'bold',textDecoration:'none',padding:'8px 20px',display:'inline-block'}}>
                Contacter sur WhatsApp
              </Link>
            </Section>
          </Section>
          
          <Section style={{backgroundColor:'#f2f7e6',border:'1px solid #b1cb29',borderRadius:'8px',padding:'16px',margin:'12px 0',textAlign:'center'}}>
            <Text style={{color:'#6b7280',fontSize:'12px',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.5px',margin:'0 0 8px'}}>
              Rendez-vous
            </Text>
            <Text style={{fontSize:'18px',fontWeight:'bold',margin:'0 0 6px'}}>{props.bookingDate}</Text>
            <Text style={{fontSize:'14px',color:'#4b5563',margin:0}}>{props.timeSlot}</Text>
          </Section>
          
          <Section style={{backgroundColor:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'16px',margin:'12px 0'}}>
            <Text style={{fontSize:'15px',fontWeight:'bold',margin:'0 0 12px'}}>Détails du cordage</Text>
            <table style={{width:'100%'}}>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666',width:'35%'}}>Raquette:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}>{props.racketBrand} {props.racketModel}</td></tr>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666'}}>Schéma:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}>{props.stringPattern}</td></tr>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666'}}>Tension:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}>{props.tension}</td></tr>
              <tr><td style={{padding:'6px 0',fontSize:'12px',color:'#666'}}>Cordage:</td><td style={{padding:'6px 0',fontSize:'12px',fontWeight:'500'}}>{props.stringType}</td></tr>
            </table>
            <Section style={{borderTop:'1px solid #e5e7eb',marginTop:'12px',paddingTop:'12px',display:'flex',justifyContent:'space-between'}}>
              <Text style={{fontSize:'14px',fontWeight:'bold',margin:0}}>Prix total:</Text>
              <Text style={{fontSize:'18px',fontWeight:'bold',color:'#b1cb29',margin:0}}>{props.totalPrice} CHF</Text>
            </Section>
          </Section>
          
          {props.comments && (
            <Section style={{backgroundColor:'#fef3c7',borderLeft:'4px solid #f59e0b',borderRadius:'4px',padding:'12px 16px',margin:'12px 0'}}>
              <Text style={{color:'#78350f',fontSize:'13px',fontWeight:'bold',margin:'0 0 6px'}}>Commentaires</Text>
              <Text style={{color:'#92400e',fontSize:'13px',lineHeight:'20px',margin:0,fontStyle:'italic'}}>{props.comments}</Text>
            </Section>
          )}
          
          <Section style={{textAlign:'center',padding:'16px'}}>
            <Link href="http://localhost:3000/admin" style={{backgroundColor:'#b1cb29',borderRadius:'6px',color:'#fff',fontSize:'14px',fontWeight:'bold',textDecoration:'none',padding:'12px 30px',display:'inline-block'}}>
              Ouvrir l'administration
            </Link>
          </Section>
          
          <Text style={{fontSize:'11px',color:'#999',textAlign:'center',margin:'20px 0 0',borderTop:'1px solid #ddd',paddingTop:'15px'}}>
            Cet email a été envoyé automatiquement par le système de réservation
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AdminBookingNotification;
