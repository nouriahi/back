package clinique.secretaire.entities;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.Projection;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Secretaire {
    @Id
    @GeneratedValue
    private Long id;
    private String nom;
    private String prenom;
    private String tel;
    private String email;
    //private String motDePasse;
    @ElementCollection
  List<String> competences;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/*public String getMotDePasse() {
		return motDePasse;
	}

	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}*/

	public List<String> getCompetences() {
		return competences;
	}

	public void setCompetences(List<String> competences) {
		this.competences = competences;
	}

	public Secretaire(Long id, String nom, String prenom, String tel, String email, String motDePasse,
			List<String> competences) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.email = email;
		//this.motDePasse = motDePasse;
		this.competences = competences;
	}

	public Secretaire() {
		super();
	}
    
}

@Projection(name = "fullSecretaire",types = Secretaire.class)
interface SecretaireProjection extends Projection{

	public Long getId();
	public String getNom();
	public String getPrenom();
	public String getTel();
	public String getEmail();
	public String getMotDePasse();
	public List<String> getCompetences();


}

