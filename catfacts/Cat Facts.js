{
  appOption: async function(app) {
    const result = await app.alert(
      "Would you like a random cat fact?",
      {
        actions: [
          { label: "Meow!", icon: "pets", value: "cat" }
        ],
        preface: "Cat Facts"
      }
    );
    if (result !== "cat") return;

    let fact = "Unable to fetch cat fact.";
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      if (data.fact) fact = data.fact;
    } catch (err) {}

    await app.alert(fact, { preface: "Cat Fact" });
  }
}