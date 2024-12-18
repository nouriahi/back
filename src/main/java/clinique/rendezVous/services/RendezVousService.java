package clinique.rendezVous.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import clinique.rendezVous.entities.Medecin;
import clinique.rendezVous.entities.RendezVous;
import clinique.rendezVous.repository.RendezVousRepos;
import clinique.rendezVous.repository.MedecinClient;

@Service
public class RendezVousService {

    private final RendezVousRepos rendezVousRepository;
    private final MedecinClient medecinClient;

    public RendezVousService(RendezVousRepos rendezVousRepository, MedecinClient medecinClient) {
        this.rendezVousRepository = rendezVousRepository;
        this.medecinClient = medecinClient;
    }

    public List<RendezVous> getAllRendezVous() {
        return rendezVousRepository.findAll();
    }

    public Optional<RendezVous> getRendezVousById(Long id) {
        return rendezVousRepository.findById(id);
    }

    public RendezVous createRendezVous(RendezVous rendezVous) {
        validateMedecinExists(rendezVous.getMedecinId());
        validateRendezVousData(rendezVous);

        rendezVous.setNom("Nom du Patient");
        rendezVous.setPrenom("Prénom du Patient");
        rendezVous.setEmail("email@patient.com");

        return rendezVousRepository.save(rendezVous);
    }

    public RendezVous updateRendezVous(Long id, RendezVous updatedRendezVous) {
        validateMedecinExists(updatedRendezVous.getMedecinId());
        validateRendezVousData(updatedRendezVous);

        return rendezVousRepository.findById(id)
                .map(existingRendezVous -> {
                    existingRendezVous.setPatientId(updatedRendezVous.getPatientId());
                    existingRendezVous.setMedecinId(updatedRendezVous.getMedecinId());
                    existingRendezVous.setRendezVousDate(updatedRendezVous.getRendezVousDate());
                    existingRendezVous.setStatus(updatedRendezVous.getStatus());
                    existingRendezVous.setNom(updatedRendezVous.getNom());
                    existingRendezVous.setPrenom(updatedRendezVous.getPrenom());
                    existingRendezVous.setEmail(updatedRendezVous.getEmail());
                    return rendezVousRepository.save(existingRendezVous);
                }).orElseThrow(() -> new RuntimeException("Rendez-vous not found"));
    }

    public void deleteRendezVous(Long id) {
        rendezVousRepository.findById(id).orElseThrow(() -> new RuntimeException("Rendez-vous not found"));
        rendezVousRepository.deleteById(id);
    }

    public List<Medecin> getAllMedecins() {
        try {
            return medecinClient.obtenirTousLesMedecins();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération des médecins", e);
        }
    }

    private void validateMedecinExists(Long medecinId) {
        try {
            medecinClient.obtenirMedecin(medecinId);
        } catch (Exception e) {
            throw new RuntimeException("Le médecin avec l'ID " + medecinId + " n'existe pas.");
        }
    }

    private void validateRendezVousData(RendezVous rendezVous) {
        if (rendezVous.getPatientId() == null || rendezVous.getMedecinId() == null || rendezVous.getRendezVousDate() == null) {
            throw new IllegalArgumentException("Les champs patientId, medecinId et rendezVousDate sont obligatoires.");
        }
    }
}
