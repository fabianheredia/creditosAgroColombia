var margin = { top: 20, right: 80, bottom: 30, left: 50 };
(width = 620), (height = 400);

//get Data
const _urlData = "/data/datos.json";

d3.json(_urlData).then(datos => {
  console.log(datos);
  // const _listImp = {
  //   dat: d3
  //     .nest()
  //     .key(d => {
  //       return +d.anio;
  //     })
  //     .rollup(d => {
  //       return d3.sum(d, d => +d.vol_mentoneladas);
  //     })
  //     .sortKeys(d3.ascending)
  //     .entries(datos),
  //   categoriaDep: d3
  //     .nest()
  //     .key(d => {
  //       return +d.departamentodestino;
  //     })
  //     .rollup(d => {
  //       return d3.sum(d, d => +d.vol_mentoneladas);
  //     })
  //     .sortKeys(d3.ascending)
  //     .entries(datos)
  // };

//defino como se pinta un alinea
  var line = d3
    .line()
    .curve(d3.curveBasis)
    .x(function(d) {
      return x(d.Anio);
    })
    .y(function(d) {
      return y(d.Valor);
    });

  //creo el espacio de trabajo
  var svg = d3
    .select(".grafico")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// defini las escalas
  var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    x.domain(
      d3.extent(datos, function(d) {
        return d.Anio;
      })
    );
    y.domain([d3.min(datos, d => d.Valor), d3.max(datos, d => d.Valor)]);
  //Listado de Departamentos y tipos de productor
  var departamentos = datos
    .map(d => d.Departamento)
    .filter((v, i, a) => a.indexOf(v) === i);
  var tiposProductor = datos
    .map(d => d.Tproductor)
    .filter((v, i, a) => a.indexOf(v) === i);
  //console.log(departamentos);


  // //se crea el nuevo espacio de trabajo

  // //agrego X
  // svg
  //   .append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(xScale));

  // //texto label en la linea
  // var _textLine = svg
  //   .selectAll("text")
  //   .enter()
  //   .append("text");
  // //agrego titulos
  // //Y
  // svg
  //   .append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 0 - margin.left - 5)
  //   .attr("x", 0 - height / 2)
  //   .attr("dy", "1em")
  //   .style("text-anchor", "middle")
  //   .text("Toneladas Importadas");
  // //X
  // svg
  //   .append("text")
  //   .attr(
  //     "transform",
  //     "translate(" + width / 2 + " ," + (height + margin.top) + ")"
  //   )
  //   .style("text-anchor", "middle")
  //   .text("Años");
  // //Agrego Y
  // svg
  //   .append("g")
  //   .attr("class", "y axis")
  //   .call(d3.axisLeft(yScale));

  // //Agrego la linea
  // svg
  //   .append("path")
  //   .datum(_listImp.dat)
  //   .attr("class", "line")
  //   .attr("d", line);

  // //Agrego los puntos
  // svg
  //   .selectAll(".dot")
  //   .data(_listImp.dat)
  //   .enter()
  //   .append("image")
  //   .attr(
  //     "xlink:href",
  //     "https://fabianheredia.github.io/VA-importacionesAguacate/img/avocado.png"
  //   )
  //   .attr("x", d => {
  //     let x = xScale(d.key) - 12;
  //     return x;
  //   })
  //   .attr("y", d => {
  //     //console.log(d.value)
  //     let y = yScale(+d.value) - 12;
  //     return y;
  //   })
  //   .attr("width", 24)
  //   .attr("height", 24)
  //   .on("click", d => {
  //     //otra imagen
  //     d3.select(".img2").remove();
  //     svg
  //       .selectAll(".dot1")
  //       .data([d])
  //       .enter()
  //       .append("image")
  //       .attr("class","img2")
  //       .attr(
  //         "xlink:href",
  //         "https://fabianheredia.github.io/VA-importacionesAguacate/img/avocado2.png"
  //       )
  //       .attr("x", d => {
  //         let x = xScale(d.key) - 12;
  //         return x;
  //       })
  //       .attr("y", d => {
  //         //console.log(d.value)
  //         let y = yScale(+d.value) - 12;
  //         return y;
  //       })
  //       .attr("width", 24)
  //       .attr("height", 24);
  //     //aqui la programacion del pie
  //     const _listImpDep = {
  //       dat: d3
  //         .nest()
  //         .key(d => {
  //           return d.departamentodestino;
  //         })
  //         .rollup(d => {
  //           return d3.sum(d, d => +d.vol_mentoneladas);
  //         })
  //         .sortKeys(d3.ascending)
  //         .entries(datos.filter(d1 => d1.anio == d.key))
  //     };
  //     console.log(_listImpDep.dat);
  //     update(_listImpDep.dat);
  //   })
  //   .on("mouseover", d => {
  //     d3.select(".info").remove();
  //     console.log(d);
  //     svg
  //       .selectAll("text.info")
  //       .data([d])
  //       .enter()
  //       .append("text")
  //       .attr("class", "info")
  //       .attr("x", d => {
  //         let x = xScale(d.key) + 24;
  //         return x;
  //       })
  //       .attr("y", d => yScale(+d.value))
  //       .text(d.value + " toneladas");
  //   });
  // // .on("mouseout", function () {})
  // //     .on("mousemove", mousemove);

  // //    var focus = svg.append("g")
  // //        .attr("class", "focus")
  // //       .style("display", "none");

  // //   focus.append("circle")
  // //       .attr("r", 4.5);

  // //    focus.append("text")
  // //       .attr("x", 9)
  // //       .attr("dy", ".35em");

  // //    svg.append("rect")
  // //        .attr("class", "overlay")
  // //       .attr("width", width)
  // //       .attr("height", height)
  // //       .on("mouseover", function() { focus.style("display", null); })
  // //       .on("mouseout", function() { focus.style("display", "none"); })
  // //       .on("mousemove", mousemove);

  // //   function mousemove() {
  // //     var x0 = x.invert(d3.mouse(this)[0]),
  // //         i = bisectDate(data, x0, 1),
  // //         d0 = data[i - 1],
  // //         d1 = data[i],
  // //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  // //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
  // //     focus.select("text").text(d);
  // //   }
});
