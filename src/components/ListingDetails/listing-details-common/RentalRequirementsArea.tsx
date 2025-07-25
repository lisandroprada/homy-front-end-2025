const RentalRequirementsArea = () => (
  <div className='accordion-item'>
    <h2 className='accordion-header'>
      <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseRentalReqs' aria-expanded='false' aria-controls='collapseRentalReqs'>
        Requisitos para Alquiler
      </button>
    </h2>
    <div id='collapseRentalReqs' className='accordion-collapse collapse'>
      <div className='accordion-body'>
        <p>Para iniciar el proceso de alquiler, solicitamos la siguiente documentación y cumplimentar las condiciones detalladas a continuación:</p>
        <ol>
          <li>
            <strong>Documentación Personal y Laboral:</strong>
            <ul>
              <li>Locatario y Garante(s): Deberán presentar DNI y recibo de sueldo.</li>
              <li>Antigüedad Laboral: Tanto el locatario como el garante deben acreditar una antigüedad mínima de un (1) año en su empleo actual.</li>
            </ul>
          </li>
          <li>
            <strong>Condiciones del Garante:</strong>
            <ul>
              <li>Situación Laboral: El garante no podrá ser jubilado.</li>
              <li>Afectación de Ingresos: El garante no debe tener deudas por cuota alimentaria para menores. El monto del alquiler no podrá superar el 30% de sus ingresos netos mensuales.</li>
              <li>Vínculo Familiar: El garante no podrá ser cónyuge, pareja o conviviente del locatario.</li>
            </ul>
          </li>
          <li>
            <strong>Condiciones de Contratación (Contrato de Locación):</strong>
            <ul>
              <li>Plazo del Contrato: Los contratos de alquiler se celebran por un período mínimo de dos (2) años.</li>
              <li>
                Actualización del Canon Locativo: El valor del alquiler se ajustará periódicamente. Si bien el Índice de Contratos de Locación (ICL) es una referencia habitual, la actualización puede
                acordarse también en base a otros índices como el Índice de Precios al Consumidor (IPC) o el Índice de Costos de la Cámara Argentina de la Construcción (CAC).
              </li>
              <li>
                Frecuencia de Actualización: La periodicidad de la actualización puede ser trimestral, cuatrimestral o semestral, según lo estipulado en cada contrato. Le recomendamos consultar las
                condiciones específicas de actualización y los índices aplicables para cada propiedad de su interés.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

export default RentalRequirementsArea;
