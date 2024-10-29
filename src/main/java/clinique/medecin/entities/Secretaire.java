package clinique.medecin.entities;

import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
@Data
public class Secretaire {
	
	private Long id;
	private String nom;
	private String prenom;
	private String tel;
	private String email;
	private String motDePasse;
	private List<String> competences;
}
