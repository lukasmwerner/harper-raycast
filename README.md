# Harper

The Grammar Checker for Developers for Raycast

![](/extra/demo.gif)

---

Harper is an excellent grammar checker that runs entirely locally
(i.e. offline Grammarly competitor)

## Install

1. Clone this repo
    - `git clone https://github.com/lukasmwerner/harper-raycast.git`
2. Pull down dependencies
    - `npm i`
3. "Install" into local Raycast
    - `npm run dev` and then quit after it says `ready  - built extension successfully`

## Features
1. Fixing any currently selected text
2. Fixing any text in the clipboard

> [!WARNING]
> The current implementation just blindly takes Harper's first suggestion.
> In the future I would like to make it so that I can use Raycast's lists to
> go over each issue.
