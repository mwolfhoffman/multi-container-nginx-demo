# Multi-Container-Nginx-Demo

This is a multi-container application that I built to learn more about deploying Docker and Kubernetes apps to AWS (and possibly other cloud providers).

The containers in this application include:
1. Django Graphql API
1. React Client
1. Postgres Database
1. Nginx Reverse Proxy 

# To Install:
1. Install Docker on your machine


# To Run:
1. `docker compose up`
1. Navigate in browser to `localhost:8080`

# To Test:
1. `docker compose exec api python manage.py test`

