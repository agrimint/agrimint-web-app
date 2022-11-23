# AgriMint Web App

(c) AgriMint team, created during the BOLT.FUN Legends of Lightning Tournament.

Current version: 0.1, November 2022.

## Overview

AgriMint is a self-sovereign banking stack aiming to serve cooperative communities in Africa, and turn their informal financial institutions such as esusu, njangi and others, into well-organized and automated digital Bitcoin banks. The name AgriMint is a combination of the agricultural focus (however, non-agricultural communities can also use it!) and the concept of federated Chaumian mints, pioneered by the [Fedimint](https://fedimint.org) project. We aim to publish AgriMint as an open-source solution for communities who want to be fully self-sovereign, and also provide hosted trust-minimized SaaS services for a simple yet secure setup.

This web application provides a user-friendly access of Guardians and Members to the features of the AgriMint stack:
- Overview of AgriMint.
- Registration of a new user/authentication of an existing user.
- Creating a new federation and inviting other Guardians.
- Accepting an invitation as a Guardian to complete the initial federation setup.
- Inviting other Members.
- Dashboard with overview of the personal balances in sats
- Depositing by paying a Lightning invoice.
- Payments to other Members
- Payments of Lightning invoices.

The app is built using Next.js and React.

## Roadmap

The following features are part of the roadmap:
- Support for US dollars using an integration with [Stablesats](https://stablesats.com/).
- Lending to other members.
- Building a credit record and borrowing with fair conditions from external lenders, using an integration with the [Growr protocol](https://growr.xyz/protocol).
- Securely storing long-term savings into a multisig vault, protected by hardware signing devices.