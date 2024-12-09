package clinique.dossierMedical.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class dossierMedical {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomPatient;
    private String prenomPatient;
    private LocalDate dateNaissance;
    private String adresse;
    private String telephone;
	private Long patientId;

    @OneToMany(mappedBy = "dossierMedical", cascade = CascadeType.ALL)
    private List<Consultation> consultations;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomPatient() {
		return nomPatient;
	}

	public void setNomPatient(String nomPatient) {
		this.nomPatient = nomPatient;
	}

	public String getPrenomPatient() {
		return prenomPatient;
	}

	public void setPrenomPatient(String prenomPatient) {
		this.prenomPatient = prenomPatient;
	}

	public LocalDate getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(LocalDate dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public List<Consultation> getConsultations() {
		return consultations;
	}

	public void setConsultations(List<Consultation> consultations) {
		this.consultations = consultations;
	}

	public dossierMedical(Long id, String nomPatient, String prenomPatient, LocalDate dateNaissance, String adresse,
			String telephone, List<Consultation> consultations) {
		super();
		this.id = id;
		this.nomPatient = nomPatient;
		this.prenomPatient = prenomPatient;
		this.dateNaissance = dateNaissance;
		this.adresse = adresse;
		this.telephone = telephone;
		this.consultations = consultations;
	}

	public dossierMedical() {
		super();
	}

    
}

