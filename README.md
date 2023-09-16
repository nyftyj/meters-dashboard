
# Meter Table
A simple Meter Table app written with React.

## Set up
```bash
pnpm install # install dependencies with yarn
pnpm start # run app on http://localhost:5173/
pnpm test # run vitest
pnpm build # build for production
pnpm serve # http://localhost:4173/
```

## Features
- Display a table of all available “meters” and their values (“display_name”, “api_name”, “active”, “used_for_billing” and “type”).
- A user is be able to sort the table by any column and be able to sort by either ascending or descending order.
- A user is be able to create new meters (via a modal), and these new meters would appear on the landing page table after successful creation.
- When a user clicks on a meter row from the landing page table, it redirects them to a meter details page. 
- From the details page, a user should have the ability to edit the meter.

## UI Components
- LandingPage
- MeterDetailsPage
- AddMeterModal
- MeterForm

## Nice to haves
- Table Pagination
- Table Data Search by query
- Error Page
- Page Loading Skeleton component
- Unit Test


## Architectural Decisions

## Questions, Decisions and Trade-offs

## UX/UI Decisions

## Accessibility (A11y)