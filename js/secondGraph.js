const svg2 = d3.select(".grafico2")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal(d3.schemeCategory10)
                // .domain(_listImp.categoriaDep.key);

let pie = d3.pie()
    .value(d => d.value)
    .sort(null);

const arc = d3.arc()
    .innerRadius(50)
    .outerRadius(radius);


function arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t));
}



function update(datos) {
     // Join new data
     const path = svg2.selectAll("path")
     .data(pie(datos));

 // Update existing arcs
 path.transition().duration(200).attrTween("d", arcTween);

 // Enter new arcs
 let pathEnter = path.enter().append("path");
 path.merge(pathEnter)
     // .data(datos)
     .attr("fill", (d) => {

         return color(d.data.key)
     })
     .attr("d", arc)
     .attr("stroke", "white")
     .attr("stroke-width", "6px")
     .each(function (d) {
         this._current = d;
     });
 path.exit().remove();
}