# Plan: Fix notifications not updating in navbar

## Information gathered
- `src/components/NavBar.jsx` renders notification bell badge + dropdown list using `activities` prop, copied into `localActivities` state. It updates only when the prop changes, or when user clicks mark-as-read.
- `src/components/Layout.jsx` passes `activities={activities}` from `App.js` into `NavBar`.
- `src/App.js` defines `activities` via `useState([...])` but the array is never updated (static).
- `src/pages/Dashboard.jsx` defines its own local `activities` state and updates it every 10s via `setInterval`, but this state is NOT passed up to `App.js` / `Layout` / `NavBar`.
- Result: dropdown opens and click marks items read, but badge/items never reflect the dynamic updates.
- `public/index.html` already includes `/bootstrap/bootstrap.bundle.min.js`, so dropdown JS should be present.

## Plan
1. Update `src/App.js`:
   - Change `const [activities] = useState(...)` to `const [activities, setActivities] = useState(...)`.
   - Add the same fake notification generator `setInterval` from `Dashboard.jsx` to update `activities` in `App.js`.
2. Update `src/pages/Dashboard.jsx`:
   - Remove the local `activities` state and the interval effect so `Dashboard` no longer has a duplicate notification stream.
3. Keep `Layout.jsx` and `NavBar.jsx` unchanged.
4. Verify manually: reload `/`, check navbar badge/list increments every ~10 seconds.
5. Run `npm test` or at least `npm run build` to ensure there are no syntax errors.

## Dependent files to edit
- `src/App.js`
- `src/pages/Dashboard.jsx`

## Followup steps
- Run `npm run build`.
- (Optional) run `npm test`.

