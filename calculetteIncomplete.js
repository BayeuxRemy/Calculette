// Baréme:

//Calculette
// affichage des boutons et mise en place d'un écouteur sur chacun d'eux: 3 points
// Affichage de la croix et mise en place de l'écouteur permettant d'effacer la calculette et de supprimer l' objet correspondant: 2 points
// Traitement en fonction de la touche préssée : 0.5 point par contrainte respectée

//Calculette2
// drag de la calculette : 4
// éviter la propagation des événements pour ne pas pouvoir déplacer la calculette é partie des boutons ou de l'afficheur: 1

//Calculette3   + 1 point moyenne JS si fonctionne.

class Calculette {
  constructor(color){
	    this.color=color; // couleur de la calculette
	    this.formule="";  // formule de calcul saisie dans l'afficheur

	    this.pO=0;        // indique le nombre de parenthéses ouvrantes
		this.pF=0;        // indique le nombre de parenthéses fermantes
		
		this.pointPresent = false; //indique le si un point est deja présent dans la formule
	   	  

		if (typeof(Calculette.zi)=="undefined" )  Calculette.zi=0;    
		// la propriété statique Calculette.zi permettra de mettre en premier plan les nouvelles calculettes ou les calculettes en cours de déplacement
 	}

	// Méthode pour afficher la calculette et mettre en place les écouteurs
	display(x,y){ 
				Calculette.zi++;

				// la classe String est étendue avec la méthode right(n) qui permet d'extraire le n caractéres de droite d'une chaine
				String.prototype.right= function(n){
					return this.substring(this.length-n)
				}

				// mise en place de la div contenant la calculette
				this.div= document.createElement("div");
				let div =this.div;
					div.style.borderRadius="10px";
					div.style.zIndex=Calculette.zi;
					div.style.position ="absolute";										
					div.style.left=x+"px";
					div.style.top=y+"px";
					div.style.width="260px";										
					div.style.height="350px";
					div.style.backgroundColor=this.color;
				document.querySelector("body").appendChild(div);

				// Mise en place de la croix permettant d'effacer la calculette et de supprinmer l'objet correspondant en mémoire
				// Il faut mettre en place un écouteur
				this.croix = document.createElement("img");
				let croix= this.croix;
					croix.src="croix.jpg";
					croix.style.borderRadius="10px";
					croix.style.position="absolute";
					croix.style.left="235px";
					croix.style.top="8px";
					croix.style.width="18px";
					croix.style.height="18px";
				div.appendChild(croix);
				
				croix.onclick=()=>{
					this.div.parentNode.removeChild(this.div);
					//this.del(this);
				};
		
				// Mise en place de l'afficheur qui contiendra la formule saisie ou le résultat du calcul
				this.afficheur=document.createElement("input");
				let afficheur= this.afficheur;
					afficheur.type="text";
					afficheur.readOnly="readonly";
					afficheur.style.borderRadius="10px";
					afficheur.style.fontSize="large";	
					afficheur.style.textAlign="right";	
					afficheur.style.position="absolute";
					afficheur.style.left="5px";										
					afficheur.style.top="35px";
					afficheur.style.width="245px";
					afficheur.style.height="50px";
					afficheur.style.size="30";
					afficheur.style.maxlength="30";	
				div.appendChild(afficheur);

				// tableau permettant de générer les boutons de la calculette
				let t=["1","2","3","(","/","4","5","6",")","*","7","8","9","E","-",".","0","=","C","+"];

				// Mise en place du clavier qui contiendra les bouton
				this.clavier=document.createElement("div");
				let clavier=this.clavier;
					clavier.style.position="absolute"
					clavier.style.left="5px";
					clavier.style.top="105px";
				div.appendChild(clavier);

				
				this.button=[];

				// boucle permettant de mettre en place les 20 boutons de la calculette
				// Il faut compléter cette création de boutons et mettre en place les écouteurs
				// Chaque bouton aura une largeur et une hauteur de 50px
				for(let i=0;i<=19;i++){
					this.button[i]=document.createElement("input");
					this.button[i].value = t[i];
					this.button[i].type = 'button';
					this.button[i].style.width = '50px';
					this.button[i].style.height = '50px';
					clavier.appendChild(this.button[i]);

					this.button[i].onclick=()=>{
						if(this.afficheur.value == 'ERROR')
						{	
							this.formule = '';
							this.afficheur.value = '';
						}
						else 
						{
							this.affiche(t[i]);
						}
					}
				}		
	}

	// Methode pour faire les traitements en fonction de la touche sélectionnée sur le clavier
	affiche(c){

		let lastChar = '';

		if(this.formule.length >= 0)
		{
			lastChar = this.formule.substr(this.formule.length - 1);
		}
		
		switch (c) {            
			case "0" :
			case "1" :
			case "2" :
			case "3" :
			case "4" :
			case "5" :
			case "6" :
			case "7" :
			case "8" :
			case "9" :
				this.formule += c; 
				this.afficheur.value = this.formule; 
				break; 
			case "(" :
				if( this.formule == '' || lastChar=='(' || lastChar=='-' || lastChar=='+' || lastChar=='*' || lastChar == '/')
				{
					this.formule += '('; 
					this.afficheur.value = this.formule;
					this.pO ++;
				}
				break; 
			case ")" :
				if(lastChar ==')' || !isNaN(lastChar))
				{
					if(this.pF < this.pO)
					{
						this.pF ++;
						this.formule += ')'; 
						this.afficheur.value = this.formule;
					}
				}
				break; 
			case "." :
				if(this.pointPresent==false && lastChar != ')')
				{
					this.formule += '.'; 
					this.afficheur.value = this.formule; 
					this.pointPresent = true;
				}
				break; 
			case "/" :
			case "*" :
				if(this.formule != '' && !isNaN(lastChar) || lastChar ==')' )
				{
					this.formule += c; 
					this.afficheur.value = this.formule; 
					this.pointPresent = false; 
				}
				else if(lastChar=='-' || lastChar=='+' || lastChar=='*' || lastChar == '/')
				{
					this.formule = this.formule.substring(0,this.formule.length-1)+c;
					this.afficheur.value = this.formule;
					this.pointPresent = false;
				}
				break;
			case "-" :
			case "+" :
				if(this.formule=='' || !isNaN(lastChar) || lastChar == '(' || lastChar ==')')
				{
					this.formule += c; 
					this.afficheur.value = this.formule;
					this.pointPresent = false; 
				}
				else if(lastChar=='-' || lastChar=='+' || lastChar=='*' || lastChar == '/')
				{
					this.formule = this.formule.substring(0,this.formule.length-1)+c;
					this.afficheur.value = this.formule;
					this.pointPresent = false;
				}
				break; 
			case "E" : 
				if(this.formule.length>1)
				{
					this.formule = this.formule.substring(0,this.formule.length-1);
					this.afficheur.value = this.formule;
				}
				break; 
			case "C" : 
				this.formule = '';
				this.afficheur.value = this.formule; 
				break; 
			case "=" : 
				if(this.pO == this.pF)
				{
					if(this.formule != '' )
					{
						this.formule = eval(this.formule);
						this.afficheur.value = this.formule; 
					}
				}
				else if (this.formule != '')
				{
					this.afficheur.value = 'ERROR';
				}
				break; 
		}
	}
}

class Calculette2 extends Calculette {

	display(){
		super.display();

		this.div.style.cursor = "all-scroll";
		this.croix.style.cursor = "pointer";
		for(let i=0;i<=19;i++)
		{
			this.button[i].style.cursor = "pointer";
		}

		this.clavier.addEventListener('mousedown', (e)=>{e.stopPropagation()},true);
		this.afficheur.addEventListener('mousedown', (e)=>{e.stopPropagation()},true);
		this.croix.addEventListener('mousedown', (e)=>{e.stopPropagation()},true);

		this.div.onmousedown = (e) => {
			this.x = e.clientX;
			this.y = e.clientY;
			this.div.onmouseup = () => {
				this.div.onmouseup = null;
				window.onmousemove = null;
			};
			window.onmousemove = (e) => {
				let pos1 = this.x - e.clientX;
				let pos2 = this.y - e.clientY;
				this.x = e.clientX;
				this.y = e.clientY;
				this.div.style.top = (this.div.offsetTop - pos2) + "px";
				this.div.style.left = (this.div.offsetLeft - pos1) + "px";
			};
		}
	}
}

class Calculette3 extends Calculette2 {

	constructor(color, id){
		super(color,id);
		this.color = color;
		this.id = id;
	}
	display() {
		super.display();

		this.croix.onmousedown = () => {
			document.getElementById(this.id).value = eval(this.formule);
		}
	}
}
