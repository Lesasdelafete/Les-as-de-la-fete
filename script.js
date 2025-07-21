function ajouterAuPanier(nom, prix) {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.push({ nom, prix });
  localStorage.setItem('panier', JSON.stringify(panier));
  alert(`${nom} ajouté au panier.`);
}

function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  const panierItem = document.getElementById('panier-items');
  const totalElement = document.getElementById('total-prix');

  panierItem.innerHTML = '';
  let total = 0;

  panier.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
	<p>${item.nom} - ${item.prix}€ 
	<button onclick="supprimerItem(${index})">❌</button>`;
    panierItem.appendChild(itemDiv);
    total += item.prix;
  });

  totalElement.textContent = `Total : ${total}€`;
}

function supprimerItem(index) {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

function viderPanier() {
  localStorage.removeItem('panier');
  afficherPanier();
}

document.addEventListener('DOMContentLoaded', () => {
  const catalogueContainer = document.getElementById("catalogue");
  if (catalogueContainer) {
    db.collection("produits").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const produit = doc.data();
        const div = document.createElement("div");
        div.className = "produit";
        div.innerHTML = `
          <img src="${produit.imageUrl}" alt="${produit.nom}" />
          <h2>${produit.nom}</h2>
          <p>${produit.description}</p>
          <p><strong>${produit.prix}€</strong></p>
          <button onclick="ajouterAuPanier('${produit.nom}', ${produit.prix})">Ajouter</button>
        `;
        catalogueContainer.appendChild(div);
      });
    });
  }
});
if (document.getElementById('panier-items')) {
  afficherPanier();
}

