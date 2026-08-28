import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne';
import FooterFour from '@/layouts/footers/FooterFour';
import FancyBanner from '@/components/common/FancyBanner';
import HeaderTwo from '@/layouts/headers/HeaderTwo';

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderTwo style_1={false} style_2={true} />
      <BreadcrumbOne title='Política de Privacidad' link='#' link_title='Páginas' sub_title='Política de Privacidad' style={true} />

      <div className='container py-120'>
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <p className='text-muted'>Última actualización: 28 de agosto de 2026</p>

            <h4 className='mt-40 mb-20'>1. Quiénes somos</h4>
            <p>
              iPropietas (Propietas Inmobiliaria) es una plataforma de gestión inmobiliaria operada en Argentina.
              Esta política describe qué datos recopilamos, con qué finalidad los usamos, cómo los protegemos y
              qué derechos tenés sobre ellos. Ante cualquier consulta podés escribirnos a{' '}
              <a href='mailto:admin@rentia.com.ar'>admin@rentia.com.ar</a>.
            </p>

            <h4 className='mt-40 mb-20'>2. Datos que recopilamos</h4>
            <p>Recopilamos datos en dos contextos principales:</p>
            <ul>
              <li>
                <strong>Uso del sitio y formularios de contacto:</strong> nombre, teléfono, email y los datos que
                completes voluntariamente al consultar por una propiedad, agendar una visita o dejar tus datos de
                contacto.
              </li>
              <li>
                <strong>Mensajería (WhatsApp, Instagram Direct y Messenger):</strong> cuando nos escribís por estos
                canales, recibimos tu identificador de contacto (número de teléfono o ID de la cuenta de
                Instagram/Facebook), tu nombre de perfil público y el contenido de los mensajes que nos enviás, con
                el único fin de responder tu consulta comercial (información de propiedades, turnos, estado de
                cuenta, etc.).
              </li>
            </ul>

            <h4 className='mt-40 mb-20'>3. Datos obtenidos a través de Meta (Facebook / Instagram)</h4>
            <p>
              Nuestra integración con la Messenger Platform y la API de Mensajería de Instagram de Meta nos permite
              recibir y responder mensajes que nos enviás a nuestras cuentas oficiales de Facebook e Instagram desde
              nuestro panel interno de atención. Los datos que Meta nos entrega (identificador de la conversación,
              nombre de perfil, contenido del mensaje y adjuntos) se usan exclusivamente para:
            </p>
            <ul>
              <li>Mostrar la conversación a nuestro equipo comercial/administrativo dentro de nuestro CRM interno.</li>
              <li>Responderte por el mismo canal.</li>
              <li>Vincular la conversación, si corresponde, con tu ficha de cliente o contrato existente.</li>
            </ul>
            <p>
              No utilizamos estos datos con fines publicitarios, no los vendemos ni los cedemos a terceros, y no los
              usamos para ningún propósito distinto del indicado, conforme a las Condiciones de la Plataforma de
              Meta.
            </p>

            <h4 className='mt-40 mb-20'>4. Cómo protegemos y almacenamos los datos</h4>
            <p>
              Los datos se almacenan en bases de datos propias, con acceso restringido a personal autorizado de
              Propietas Inmobiliaria, sobre infraestructura con controles de acceso y cifrado en tránsito (HTTPS).
              Conservamos el historial de conversación mientras exista una relación comercial activa o potencial, y
              lo eliminamos a pedido del titular de los datos.
            </p>

            <h4 className='mt-40 mb-20'>5. Con quién compartimos datos</h4>
            <p>
              No compartimos tus datos con terceros ajenos a la operación del servicio, salvo proveedores
              tecnológicos que actúan como encargados de tratamiento (por ejemplo, hosting o infraestructura en la
              nube) bajo confidencialidad, o cuando la ley lo requiera.
            </p>

            <h4 className='mt-40 mb-20'>6. Tus derechos</h4>
            <p>
              Podés solicitar en cualquier momento el acceso, la rectificación o la eliminación de tus datos
              personales, así como oponerte a su tratamiento, escribiéndonos a{' '}
              <a href='mailto:admin@rentia.com.ar'>admin@rentia.com.ar</a>. Vas a recibir respuesta en un plazo
              razonable.
            </p>

            <h4 className='mt-40 mb-20'>7. Eliminación de datos de la cuenta de Meta</h4>
            <p>
              Si dejás de usar nuestros canales de Facebook o Instagram, podés solicitar la eliminación completa de
              los mensajes e información asociada a tu conversación escribiéndonos a{' '}
              <a href='mailto:admin@rentia.com.ar'>admin@rentia.com.ar</a> con el asunto &quot;Eliminar mis datos&quot;,
              indicando el nombre de usuario o número desde el que nos escribiste.
            </p>

            <h4 className='mt-40 mb-20'>8. Cambios a esta política</h4>
            <p>
              Podemos actualizar esta política periódicamente. Publicaremos cualquier cambio en esta misma página
              indicando la fecha de la última actualización.
            </p>

            <h4 className='mt-40 mb-20'>9. Contacto</h4>
            <p>
              Propietas Inmobiliaria — <a href='mailto:admin@rentia.com.ar'>admin@rentia.com.ar</a>
            </p>
          </div>
        </div>
      </div>

      <FancyBanner style={false} />
      <FooterFour />
    </>
  );
};

export default PrivacyPolicy;
