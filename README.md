# Distribucion de Creditos al Agro en Colombia

 Analisis a la información sobre los desembolsos realizados por el Banco Agrario y Finagro en cada departamento durante el período 2012 a 2018.


         # Como Instalar
clonar o descargar el repositorio
 ``` git clone [repo] ```
copiar y pegar el contenido en un servidor de aplicaciones
* tomcat
* IIS
* ...

ejecutar la aplicación desde el explorador

# Tecnologias usadas
* D3 V5
* BulmaJs

# **_Insight:_** :shipit:
* 

# De donde vienen los Datos

Los datos provienen de [Agronet](http://www.agronet.gov.co/estadistica/Paginas/default.aspx) y son suministrados por **Banco Agrario y Finagro**

# What
Dataset Availability: Static

Data Types: Table -> Items -> Attributes

Data and Dataset Types: Temporal

Dataset Types: Temporal

_Attributes:_

| item   |      Type      |  Description |
|----------|:-------------:|------:|
| Tproductor |  Categorical (Pequeño Productor; Grandes Productores) | Son los productores a los que el Bango Agrario y Finagro han otorgado creditos |
| Departamento |    Categorical (Todos los Departamentos de Colombia)   |   Division politica de Colombia |
| Anio | Time (Ordered -> Quantitative -> Sequential) |    Variable de tiempo que indica el periodo en el cual fue otorgado el credito |
| Valor | Ordered -> Quantitative -> Sequential |    valor del credito en millones de pesos |

# Why
Tarea Principal:

comparar a traves del tiempo los creditos otorgados a los pequeños y grandes productores, se espera que los grandes productores soliciten sumas mas grandes, pero es conocido que hay mas menores productores.

_Query -> Compare -> Trends_ | montos otorgados a traves del tiempo


Tarea Secundaria:

Ver si existen periodos donde se otorgo un monto superiror al promedio de los creditos, esto para validar que no se dieran posibles agroingresos.

_Analyze -> Consume -> Discover -> Outliers_ | valores extraños en los creditos otorgados

# How
| Encode | Manipulate | Facet | Reduce |
| ---|---|---|---|
|

Encode -> Arrange -> Express
Map -> Color -> hue
Manipulate-> Change,Select

# Marcas
Lineas (definir la tendecia de las importaciones)
Puntos (marcar la importacion en un periodo del tiempo)

# Canales
X -> Años de importacion
Y -> Toneladas de agucatae importado
Color -> Departamento donde llego el produto importado