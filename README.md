## Example Nodejs integration with grafana agent

Simple app to demonstrate how Grafana agent can be configured to send Prometheus metrics, Loki logs
etc. from a Node.js application.

### Prerequisites

- You need to have a Grafana Cloud user (free tier is OK)
- Install `docker` and `docker-compose`.

### Setup

1. Configure Node.js integration in your grafana instance.
   Go to `https://<YOUR_STACK>.grafana.net/a/grafana-easystart-app/integrations-management/integrations`
   and search Node.js. Configure and enable it (OS version is not relevant, as we are going to
   use docker for the agent).

2. Copy `GCLOUD_STACK_ID`, `GCLOUD_API_KEY` and `GCLOUD_API_URL` environment variables that are
   being displayed in the integration configuration into a `.env` file

3. Run `yarn` to install local dependencies

4. Run `yarn configure` to download your base Grafana agent configuration. It will be stored
   in `config/grafana-agent-config.yaml`. Please avoid to commit this file, as it includes API Keys

5. Run `docker-compose up` to start every needed service (including our test application)

6. Go to `http://localhost:4001`. You should see a hello world message. From now on prometheus metrics
   should being be scraped from your Grafana Cloud instance.

#### Optional: Configure Loki to send logs

If you want to test Loki integration for sending logs. Follow this simple step:
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
