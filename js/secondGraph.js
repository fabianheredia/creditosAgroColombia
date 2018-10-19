var segundaGraica = (datos)=>{

    var datosDepto;
    document.getElementById("selDepto").onchange = (d)=>{
    
    let _select = document.getElementById("selDepto").item(document.getElementById("selDepto").selectedIndex).text;
    
    console.log(_select);
};
let firstSelect = document.getElementById("selDepto").item(0);
var svg2 = d3
.select(".grafico2")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);
var g = svg2.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().range([0, width]),
y = d3.scaleLinear().range([height, 0]),
z = d3.scaleOrdinal(d3.schemeDark2);
x.domain(datos
    .map(d => d.Anio)
    .filter((v, i, a) => a.indexOf(v) === i));
y.domain([(d3.min(datos, d => d.Valor)-1), d3.max(datos, d => d.Valor)]).nice();

//console.log(departamentos);
g.append("g")
.attr("class", "axis axis--x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

g.append("g")
.attr("class", "axis axis--y")
.call(d3.axisLeft(y))
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", "0.71em")
.attr("fill", "#000")
.text("Millones, $");
}

cambiarDataSet(firstSelect);

var cambiarDataSet = (departamento)=>{

    datosDepto = datos.filter(d => d.Departamento == departamento);
console.log(datosDepto);
    // datosDepto= {
    //     dat: d3
    //       .nest()
    //       .key(d => {
    //         return +d.anio;
    //       })
    //       .rollup(d => {
    //         return d3.sum(d, d => +d.vol_mentoneladas);
    //       })
    //       .sortKeys(d3.ascending)
    //       .entries(datos),
    //     categoriaDep: d3
    //       .nest()
    //       .key(d => {
    //         return +d.departamentodestino;
    //       })
    //       .rollup(d => {
    //         return d3.sum(d, d => +d.vol_mentoneladas);
    //       })
    //       .sortKeys(d3.ascending)
    //       .entries(datos)
    //   };
}
// const svg2 = d3.select(".grafico2")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", `translate(${width / 2}, ${height / 2})`);

// const color = d3.scaleOrdinal(d3.schemeCategory10)
//                 // .domain(_listImp.categoriaDep.key);

// let pie = d3.pie()
//     .value(d => d.value)
//     .sort(null);

// const arc = d3.arc()
//     .innerRadius(50)
//     .outerRadius(radius);


// function arcTween(a) {
//     const i = d3.interpolate(this._current, a);
//     this._current = i(1);
//     return (t) => arc(i(t));
// }



// function update(datos) {
//      // Join new data
//      const path = svg2.selectAll("path")
//      .data(pie(datos));

//  // Update existing arcs
//  path.transition().duration(200).attrTween("d", arcTween);

//  // Enter new arcs
//  let pathEnter = path.enter().append("path");
//  path.merge(pathEnter)
//      // .data(datos)
//      .attr("fill", (d) => {

//          return color(d.data.key)
//      })
//      .attr("d", arc)
//      .attr("stroke", "white")
//      .attr("stroke-width", "6px")
//      .each(function (d) {
//          this._current = d;
//      });
//  path.exit().remove();
// }