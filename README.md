# Siebel DevTools

A Chrome DevTools extension for Siebel OpenUI developers.

---

### Prerequisites

- Siebel OpenUI Web Application
- Chrome

---

### Installation

> If you want to use the default version follow the steps below:

1. Go to [/dist](https://github.com/sandeep-menon/siebel-devtools/tree/main/dist) and download the <code>.crx</code> file.
2. In your Chrome browser visit the extensions page.
    1. Open a new tab in Chrome.
    2. Go to <code>chrome://extensions/</code> address.
4. Drag and drop the <code>.crx</code> file.

---

> If you want to customize the Siebel DevTools for your Siebel project follow the steps below:

1. Go to [/src](https://github.com/sandeep-menon/siebel-devtools/tree/main/src) and download the source code.
2. In your Chrome browser visit the extensions page.
    1. Open a new tab in Chrome.
    2. Go to <code>chrome://extensions/</code> address.
3. Check the <code>Developer mode</code> toggle.
4. Click on <code>Load unpacked</code> button.
5. Navigate to source code directory and open it.

---

### Usage

> Simply open Chrome's DevTools and wait a moment for Siebel DevTools to appear as one of the DevTools panel.

---

### More Info
#### Limitations
- Siebel DevTools currently only crawls till applet layer.
- It is not published on Chrome's Web Store. _(yet?)_
#### How it works?
- Siebel DevTools uses a Promise-Resolve arch style.
- It uses class-less CSS framework [Water.css](https://github.com/kognise/water.css)
#### TODOs
- [x] Initial Release / Proof of Concept
- [x] Crawl till applets
- [ ] On click of applet summary, fetch applet level details
    - [ ] Applet's title
    - [ ] Applet's current record _(form applet only)_
    - [ ] Applet's record set _(list applet only)_
    - [ ] Applet's <code>BusComp</code> name
- [ ] Add a side panel proof of concept
    - [ ] Add details about the current click <code>$0</code> on inspected page
- [ ] Add another side panel for client-side simulation
    - [ ] A form for fetching required <code>Profile Attribute</code>
    - [ ] Simulate a <code>Business Service</code> exposed to client
