# thanhnc.tech

## Run

```bash
npm run dev
```

## Build

- npm run build

- docker build -t thanhnc.tech:v1 .

- docker run -p 3000:3000 thanhnc.tech:v1

## Deploy MongoDB Atlas

$ export MONGODB_ATLAS_PUBLIC_KEY="xxxx" # https://www.mongodb.com/docs/atlas/configure-api-access/
$ export MONGODB_ATLAS_PRIVATE_KEY="xxxx"
$ terraform plan
$ terraform apply

## Deploy
