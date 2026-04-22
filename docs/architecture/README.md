# 🧠 Chytanka Architecture

This section documents the architecture of Chytanka using a C4-style approach.

Chytanka is designed as a **multi-entry, embeddable reader platform** with hybrid data access.

---

## 🚀 Key Concepts

* 📖 **Embeddable Reader** — can run standalone or inside other websites (iframe)
* 🔌 **Multiple Entry Points**:

  * Direct (PWA)
  * Browser Extension
  * Embedded (Host Website)
* 🌐 **Hybrid Data Access**:

  * Direct requests to APIs
  * Optional proxy for restricted sources
  * Local file support (ZIP/CBZ/PDF)

---

## 📊 Diagrams

### 1. System Context

👉 [Open context diagram](./context.mmd)

Shows the ecosystem:

* User interactions
* External systems
* Entry points

---

### 2. Container Architecture

👉 [Open container diagram](./container.mmd)

Shows:

* Main runtime parts of the system
* Frontend + proxy separation

---

### 3. Data Flow

👉 [Open flow diagram](./flow.mmd)

Shows:

* How requests are resolved
* Direct vs proxy logic

---

### 4. Proxy Internals

👉 [Open proxy diagram](./proxy.mmd)

Shows:

* Request pipeline
* Validation and fetch logic

---

## 🧭 How to Read

Start with **Context**, then go deeper:

```text
Context → Container → Flow → Details
```

---

## 🧩 Architecture Style

Chytanka follows a pragmatic interpretation of the C4 model:

* Context diagrams describe the ecosystem
* Container diagrams describe runtime structure
* Flow diagrams explain behavior

---

## 📌 Notes

* Diagrams are written in **Mermaid**
* Stored alongside the code for versioning
* Designed to be readable without external tools
