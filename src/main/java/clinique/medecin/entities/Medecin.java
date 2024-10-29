package clinique.medecin.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.rest.core.config.Projection;

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
	private List<String> langues;}

@Projection(name = "fullMedecin",types = Medecin.class)
interface MedecinProjection extends Projection{

	public Long getId();
	public String getNom();
	public String getPrenom();
	public String getTel();
	public String getEmail();
	public String getMotDePasse();
	public String getSpecialite();
	public String getDescription();
	@ElementCollection
	public List<String> getLangues();


}