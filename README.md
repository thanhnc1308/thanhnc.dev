# thanhnc.dev

## Run

```bash
npm run dev
```

## Build

- npm run build

- docker build -t thanhnc.dev:v1 .

- docker run -p 3000:3000 thanhnc.dev:v1

## Deploy MongoDB Atlas

In terraform/

```
$ cp terraform.tfvars.example terraform.tfvars
$ terraform init # first time run
$ terraform plan
$ terraform apply
$ terraform output private_connection_string # get db connection string
```

## Deploy
