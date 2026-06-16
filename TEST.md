## Background

You have been tasked with completing a task on an existing point-of-sale system. The stack consists of a React frontend and a backend-for-frontend API layer which pulls from external microservices (mocked as a service object over hard-coded data with a simulated network delay).

The goal of this exercise is to show how you work through a problem - prioritise doing the work correctly over rushing to complete everything within the time limit.

Notes:

- you should treat the external_services_mock folder as if it's an external API owned by another team
- The tasks are deliberately designed to take slightly longer than the time allows for.

## Exercise

- implement a modal for creating an order
  - the modal should take a garage ID, customer ID and vehicle ID
  - refresh the orders table when the order is created
- extend the modal to be able to update orders as well, and add a button into the
  orders table to edit an order