package clinique.rendezVous.entities;


import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Medecin {
	@Id
	@GeneratedValue
	private Long id;
	private String nom;
	private String prenom;
	private String tel;
	private String email;
	private String motDePasse;
	private String specialite;
	private String description;
	private List<String> langues;
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
	public String getMotDePasse() {
		return motDePasse;
	}
	public void setMotDePasse(String motDePasse) {
		this.motDePasse = motDePasse;
	}
	public String getSpecialite() {
		return specialite;
	}
	public void setSpecialite(String specialite) {
		this.specialite = specialite;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public List<String> getLangues() {
		return langues;
	}
	public void setLangues(List<String> langues) {
		this.langues = langues;
	}
	public Medecin(Long id, String nom, String prenom, String tel, String email, String motDePasse, String specialite,
			String description, List<String> langues) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.email = email;
		this.motDePasse = motDePasse;
		this.specialite = specialite;
		this.description = description;
		this.langues = langues;
	}
	public Medecin() {
	
	}}
