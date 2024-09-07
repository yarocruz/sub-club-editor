# Sub Club Editor

[Sub Club](https://melted-april-eb6.notion.site/Sub-club-FAQ-7c659f29671244f88bcc8dce5139225e) is a service that brings creator payments to the Fediverse. It lets publishers and creators offer paid subscriptions to Mastodon and ActivityPub platforms.

While I found it easy to get started in creating a Sub Club account by following their [onboarding site](https://sub.club/onboarding), I found posting to the account by having to make a private '@t mention' to your sub.club handle a bit hacky. I mean, not that this isn't less hacky, but I imagine that regular users will find this a bit cumbersome and confusing.

This small (for now) webapp is a way to instead use [their REST API](https://documenter.getpostman.com/view/25748250/2sAXjJ6Yfe#intro) with a simple UI to quickly post to your Premium sub.club.

The idea is to just go to site where you can you just type in the box and hit submit.

## Cloning and how to use this APP

_In progress..._

I'm planning on giving more detailed step by step instructions here, but for now just keep in mind that you need to use the API key, that it's only using the basic POST request with just text and no media, and it needs a server because CORS. Their docs page for the REST Endpoints is a little "rough". (It assumes you know your stuff.) For example, if you want to do a quick test with curl you need to add the Bearer key to the headers like so:

```bash
curl --location 'https://api.sub.club/public/post' \
--header 'Authorization: Bearer YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "content": "Hello world"
}'
```

They don't have this explicity stated in the docs.
