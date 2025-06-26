## Estrutura do Nest

#### Decorators:

- Função que adiciona comportamento em algo
- Uma função que recebe um valor como parêmetro e devolve esse parâmetro modificado

### Controller
- Porta de entrada para a aplicação (geralmente HTTP)

### Module
- Geralmente uma classe vazia
- Ao criar uma aplicação, é necessário passar um módulo inicial
- O arquivo responsável por juntar tudo, reune controllers, configurações, conexão com o banco de dados

### Service / Provider
- Tudo que não for um controller, provavelmente será um service/provider
- Tudo que não receber uma requisição http
- Tudo que for necessário injetar em outras classes é um servide/provider

### Mappers
- Classes responsáveis por converter uma entidade em um formato de uma camada para o formato de outra comada

##### undefined => valor inexistente
##### null => valor não preenchido

### Presenter
- Transformar e formatar os dados da camada de domínio para que eles sejam retornados pela camada HTTP (ou outro tipo de interface), no formato esperado pelo cliente (por exemplo, o front-end).
- Específico da camada HTTP