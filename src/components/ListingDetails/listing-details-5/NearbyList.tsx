interface DataType {
   title: string;
   count: string;
}[];

const list_data: DataType[] = [
   { title: "Escuela y Colegio:", count: "0.9km", },
   { title: "Supermercado:", count: "0.2km", },
   { title: "Estación de Metro:", count: "0.7km", },
   { title: "Gimnasio:", count: "2.3km", },
   { title: "Universidad:", count: "2.7km", },
   { title: "Hospital:", count: "1.7km", },
   { title: "Centro Comercial:", count: "1.1km", },
   { title: "Comisaría:", count: "1.2km", },
   { title: "Estación de Bus:", count: "1.1km", },
   { title: "Río:", count: "3.1km", },
   { title: "Mercado:", count: "3.4km", },
];

const NearbyList = () => {
   return (
      <div className="accordion-item">
         <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixA" aria-expanded="true" aria-controls="collapseSixA">
               Qué hay cerca
            </button>
         </h2>
         <div id="collapseSixA" className="accordion-collapse collapse">
            <div className="accordion-body">
               <div className="property-nearby">
                  <p className="fs-20 lh-lg pb-30">La gestión de riesgos y el cumplimiento, cuando se abordan estratégicamente, pueden ir más allá de mitigar amenazas.</p>
                  <ul className="style-none d-flex flex-wrap justify-content-between nearby-list-item">
                     {list_data.map((list, i) => (
                        <li key={i}>{list.title}<span className="fw-500 color-dark">{list.count}</span></li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NearbyList
