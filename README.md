<h1> AWS-lambda com Node.js</h1>

<p> Esse projeto tem por finalidade criar e testar localmente funções serveless (lambda) com o intuito de realizar deploys das mesmas no AWS Lambda. Além usar o AWS-SDK para invocar as funções armazenadas no AWS Lambda, a partir de um servidor local Node.js.</p>

<h1> Módulo lambda </h1>
<h2>Dependências necessárias do projeto na pasta <strong>/lambda</strong></h2>
<ul>
    <li> Node.js </li>
    <li> Serveless Framework </li>
    <li> Credenciais da conta AWS </li>
</ul>

```
$ cd lambda
$ npm install
$ npm install --save aws-sdk
```

<p> No arquivo serveless.yml são definido as configurações da função lambda.</p>

```
service: aws-nodejs

frameworkVersion: '3'

plugins:
  - serverless-offline

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-2

functions:
  check_duplicate_papers:
    handler: handler.check_duplicate_papers
    #events:
    #  - httpApi:
    #      path: /check
    #      method: get
```

<ul>
    <li><strong>service.name:</strong> Nome da lambda quando o projeto for publicado.</li>
    <li><strong>plugins.serverless-offline:</strong> Plug-in que permiti o acesso via http pelo método GET na url /check. Para executar localmente é necessário instalar o plug-in e descomentar as linhas do arquivo serveless.yml.</li>
    <li><strong>provider.name:</strong> Provedor de nuvem usado no projeto.</li>
    <li><strong>provider.runtime:</strong> Ambiente de execução da função.</li>
    <li><strong>provider.region:</strong> Local onde o projeto será publicado.</li>
    <li><strong>functions:</strong> Definição das funções do projeto, pacote.método correspondente para execução e quais formas serão acessados.</li>
</ul>

<h2>Testando a primeira execução</h2>

```
$ serverless invoke local --function hello
```

<h2>Levantando servidor HTTP com o comando</h2>
<p> Lembre-se de descomentar as linhas do arquivo serveless.yml</p>

```
$ serverless offline
```

Acesse [http://localhost:3000/check](http://localhost:3000/check).

A resposta da requisição será um JSON conforme código definido em **handler.js** no método **check_duplicate_papers**. Uma Lambda com execução via HTTP será publicada na Amazon como API Gateway.

<h2> Deploy da função na AWS </h2>
<p> É necessário configurar um usuário na sua conta da AWS e adicionar as seguintes políticas de permissões : </p>
<ul>
    <li>AWSCloudFormationFullAccess	</li>
    <li>AWSLambda_FullAccess</li>
    <li>CloudWatchLogsFullAccess</li>
    <li>IAMFullAccess</li>
</ul>

Também é necessário criar na sua conta AWS **access key ID** e **Secret access key**.

<p> Após essas configurações execute o comando: </p>

```
serverless config credentials --provider **provider** --key **access key ID** --secret **Secret access key**
```

<p> Após isso faça deploy da função.</p>

```
serveless deploy
```

<h1>Módulo backend</h1>
<h2>Dependências necessárias do projeto na pasta <strong>/lambda</strong></h2>
<ul>
    <li> Node.js </li>
    <li> Credenciais da conta AWS </li>
</ul>

<p> Após realizar o deploy com sucesso da função lambda localizada na pasta /lambda. </p>

```
$ cd backend
$ npm install
$ npm start
```

Utilize alguma ferramenta(postman, insomnia) que auxilia na criação e testagem de API Rest para facilitar a visualização. Ou acesse via browser [http://localhost:3333/check](http://localhost:3333/check).

Defina na sua ferramenta uma requisição HTTP método GET [http://localhost:3333/check](http://localhost:3333/check), faça a requisição e veja a resposta que sua função lambda publicada na AWS retornou.

