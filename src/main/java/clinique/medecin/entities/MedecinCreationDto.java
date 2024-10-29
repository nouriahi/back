package clinique.medecin.entities;


import java.util.List;

import lombok.Data;

@Data
public class MedecinCreationDto {
	private Long id;
	private String nom;
	private String prenom;
	private String tel;
	private String email;
	private String motDePasse;
	private String specialite;
	private String description;
	private List<String> langues;
    private Long secretaireId; 
}
