// api/notification
import { Novu } from "@novu/node";

export default function handler(req, res) {
  const issue = {
    name: "Issue test",
    author: "Patrick",
    labels: ["bug", "issue"],
    url: "https://github.com/pandr20/bluekey-notification",
  };

  const novu = new Novu(process.env.NOVU_API_SECRET);

  novu.trigger("voyage-change", {
    to: {
      subscriberId: "<REPLACE_WITH_DATA>",
    },
    payload: {},
  });
  res.status(200).json(issue);
}
