interface FloorPlanProps {
  floorPlans: Array<{
    url: string;
  }>;
}

const FloorPlan = ({floorPlans}: FloorPlanProps) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFiveA' aria-expanded='false' aria-controls='collapseFiveA'>
          Planos
        </button>
      </h2>
      <div id='collapseFiveA' className='accordion-collapse collapse'>
        <div className='accordion-body'>
          <div className='property-floor-plan'>
            <div className='wrapper'>
              <div id='floor-plan' className='carousel slide'>
                <div className='carousel-inner'>
                  {floorPlans.map((plan, idx) => {
                    const label = `Plano ${idx + 1}`;
                    const [filePath] = plan.url.split(/[?#]/, 1);
                    const isPdf = filePath.toLowerCase().endsWith('.pdf');
                    return (
                      <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={plan.url}>
                        {isPdf ? (
                          <div className='rounded-2 border bg-light p-4 text-center'>
                            <a
                              href={plan.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='btn btn-outline-dark'
                              aria-label={`Abrir ${label.toLowerCase()} en PDF en una pestaña nueva`}
                            >
                              <i className='bi bi-file-earmark-pdf me-2' aria-hidden='true' />
                              Abrir plano en PDF
                            </a>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={plan.url} alt={label} className='w-100' />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className='carousel-indicators position-static pt-25'>
                  {floorPlans.map((_, idx) => (
                    <button
                      key={idx}
                      type='button'
                      data-bs-target='#floor-plan'
                      data-bs-slide-to={idx}
                      className={idx === 0 ? 'active' : ''}
                      aria-current={idx === 0 ? 'true' : undefined}
                      aria-label={`Mostrar plano ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
