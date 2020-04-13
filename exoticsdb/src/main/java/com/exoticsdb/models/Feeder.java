package com.exoticsdb.models;

import com.exoticsdb.utils.AuditModel;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Table(name = "feeders")
public class Feeder extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Column
    private BigInteger length;

    @Column
    private String species;

    @Column
    private BigInteger weight;

    @Column
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy")
    private Date dateOffered;

    @Column
    private boolean consumed;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reptile_id", nullable = false)
    private Reptile reptile;

    public Feeder() {

    }

    public Feeder(BigInteger length, String species, BigInteger weight, Date dateOffered, Boolean consumed, Reptile reptile) {
        this.length = length;
        this.species = species;
        this.weight = weight;
        this.dateOffered = dateOffered;
        this.consumed = consumed;
        this.reptile = reptile;
    }


    public BigInteger getLength() {
        return length;
    }

    public void setLength(BigInteger length) {
        this.length = length;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public BigInteger getWeight() {
        return weight;
    }

    public void setWeight(BigInteger weight) {
        this.weight = weight;
    }

    public Date getDateOffered() {
        return dateOffered;
    }

    public void setDateOffered(Date dateOffered) {
        this.dateOffered = dateOffered;
    }

    public Boolean getConsumed() {
        return consumed;
    }

    public void setConsumed(Boolean consumed) {
        this.consumed = consumed;
    }

    public Reptile getReptile() {
        return reptile;
    }

    public void setReptile(Reptile reptile) {
        this.reptile = reptile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
