package clinique.medecin.controller;

import clinique.medecin.entities.Medecin;
import clinique.medecin.entities.MedecinCreationDto;
import clinique.medecin.entities.MedecinSecretaire;
import clinique.medecin.service.MedecinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medecins")
public class MedecinController {

    @Autowired
    private MedecinService medecinService;

    @PostMapping("/creerAvecSecretaire")
    public Medecin creerMedecinAvecSecretaire(@RequestBody MedecinCreationDto medecinDto) {
        return medecinService.creerMedecinAvecAffectation(medecinDto);
    }
}