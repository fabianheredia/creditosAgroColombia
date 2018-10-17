var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  },
  width = 620,
  height = 400,
  radius = Math.min(width, height) / 2;

//get Data
const _urlData = "https://www.datos.gov.co/resource/5p8p-itax.json";

d3.json(_urlData).then(datos => {
  console.log(datos);
  const _listImp = {
    dat: d3
      .nest()
      .key(d => {
        return +d.anio;
      })
      .rollup(d => {
        return d3.sum(d, d => +d.vol_mentoneladas);
      })
      .sortKeys(d3.ascending)
      .entries(datos),
    categoriaDep: d3
      .nest()
      .key(d => {
        return +d.departamentodestino;
      })
      .rollup(d => {
        return d3.sum(d, d => +d.vol_mentoneladas);
      })
      .sortKeys(d3.ascending)
      .entries(datos)
  };
  //console.log(_listImp.dat)
  var _maxAnio = d3.max(_listImp.dat, d => +d.key);
  var _minAnio = d3.min(_listImp.dat, d => +d.key);
  var _maxTon = d3.max(_listImp.dat, d => +d.value);
  var _minTon = d3.min(_listImp.dat, d => +d.value);

  var xScale = d3
    .scaleLinear()
    .domain([_minAnio, _maxAnio]) // input
    .range([0, width - 10]); // output

  var yScale = d3
    .scaleLinear()
    .domain([_minTon, _maxTon]) // input
    .range([height - 10, 0]); // output

  var line = d3
    .line()
    .x(d => xScale(+d.key))
    .y(d => yScale(+d.value))
    .curve(d3.curveMonotoneX);

  //creo el espacio de trabajo
  var svg = d3
    .select(".grafico")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //se crea el nuevo espacio de trabajo
 

  //agrego X
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
  
  //texto label en la linea
  var _textLine = svg
    .selectAll("text")
    .enter()
    .append("text");
  //agrego titulos
  //Y
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 5)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Toneladas Importadas");
  //X
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top) + ")"
    )
    .style("text-anchor", "middle")
    .text("Años");
  //Agrego Y
  svg
    .append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));

  //Agrego la linea
  svg
    .append("path")
    .datum(_listImp.dat)
    .attr("class", "line")
    .attr("d", line);

  //Agrego los puntos
  svg
    .selectAll(".dot")
    .data(_listImp.dat)
    .enter()
    .append("image")
    .attr(
      "xlink:href",
      "https://fabianheredia.github.io/VA-importacionesAguacate/img/avocado.png"
    )
    .attr("x", d => {
      let x = xScale(d.key) - 12;
      return x;
    })
    .attr("y", d => {
      //console.log(d.value)
      let y = yScale(+d.value) - 12;
      return y;
    })
    .attr("width", 24)
    .attr("height", 24)
    .on("click", d => {
      //otra imagen
      d3.select(".img2").remove();
      svg
        .selectAll(".dot1")
        .data([d])
        .enter()
        .append("image")
        .attr("class","img2")
        .attr(
          "xlink:href",
          "https://fabianheredia.github.io/VA-importacionesAguacate/img/avocado2.png"
        )
        .attr("x", d => {
          let x = xScale(d.key) - 12;
          return x;
        })
        .attr("y", d => {
          //console.log(d.value)
          let y = yScale(+d.value) - 12;
          return y;
        })
        .attr("width", 24)
        .attr("height", 24);
      //aqui la programacion del pie
      const _listImpDep = {
        dat: d3
          .nest()
          .key(d => {
            return d.departamentodestino;
          })
          .rollup(d => {
            return d3.sum(d, d => +d.vol_mentoneladas);
          })
          .sortKeys(d3.ascending)
          .entries(datos.filter(d1 => d1.anio == d.key))
      };
      console.log(_listImpDep.dat);
      update(_listImpDep.dat);
    })
    .on("mouseover", d => {
      d3.select(".info").remove();
      console.log(d);
      svg
        .selectAll("text.info")
        .data([d])
        .enter()
        .append("text")
        .attr("class", "info")
        .attr("x", d => {
          let x = xScale(d.key) + 24;
          return x;
        })
        .attr("y", d => yScale(+d.value))
        .text(d.value + " toneladas");
    });
  // .on("mouseout", function () {})
  //     .on("mousemove", mousemove);

  //    var focus = svg.append("g")
  //        .attr("class", "focus")
  //       .style("display", "none");

  //   focus.append("circle")
  //       .attr("r", 4.5);

  //    focus.append("text")
  //       .attr("x", 9)
  //       .attr("dy", ".35em");

  //    svg.append("rect")
  //        .attr("class", "overlay")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .on("mouseover", function() { focus.style("display", null); })
  //       .on("mouseout", function() { focus.style("display", "none"); })
  //       .on("mousemove", mousemove);

  //   function mousemove() {
  //     var x0 = x.invert(d3.mouse(this)[0]),
  //         i = bisectDate(data, x0, 1),
  //         d0 = data[i - 1],
  //         d1 = data[i],
  //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
  //     focus.select("text").text(d);
  //   }
});
