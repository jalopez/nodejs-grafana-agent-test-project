## Example Nodejs integration with grafana agent

Simple app to demonstrate how Grafana agent can be configured to send Prometheus metrics, Loki logs
etc. from a Node.js application.

### Prerequisites

- You need to have a Grafana Cloud user with a stack.
- Install `docker` and `docker-compose`.

### Setup

1. Configure Node.js integration in your grafana instance.
   Go to https://<YOUR_STACK>.grafana.net/a/grafana-easystart-app/integrations-management/integrations
   and search Node.js

2. Copy `GCLOUD_STACK_ID`, `GCLOUD_API_KEY` and `GCLOUD_API_URL` environment variables that are
   being displayed in the integration configuration into a `.env` file

3. Run `yarn` to install local dependencies

4. Run `yarn configure` to download your base Grafana agent configuration

5. Run `docker-compose up` to start every service (including test application)

6. Go to `http://localhost:4001`. You should see a hello world message. Besides, prometheus metrics
   should being be scraped from your Grafana Cloud instance.

#### Optional: Configure Loki to send logs

Append this snippet to your `./config/grafana-agent-config.yaml` file, under `loki > configs` path. And
restart all services. You should be able to see logs being scraped into your Loki instance.

```yaml
scrape_configs:
  - job_name: nodejsapp
    static_configs:
      - targets: [localhost]
        labels:
          job: testapp
          __path__: /var/log/node/*log
```
