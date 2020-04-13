package com.exoticsdb.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table(name = "reptile")
public class Reptile implements Serializable {

    private static final long serialVersionUID = -2343243243242432341L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;
    @Column
    private String scientificName;
    @Column
    private String nickName;
    @Column
    private Integer age;
    @Column
    private BigInteger weight;
    @Column
    private BigInteger length;
    @Column
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy")
    private Date purchaseDate;
    @Column
    private boolean shed;
    @Column
    private boolean breeder;
    @OneToMany(mappedBy = "reptile", cascade = {CascadeType.ALL})
    private List<Feeder> feeders;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile user;

    public Reptile() {

    }

    public Reptile(String scientificName, String nickName, Integer age, BigInteger weight, BigInteger length, Date purchaseDate){
       this.scientificName = scientificName;
       this.nickName = nickName;
       this.age = age;
       this.weight = weight;
       this.length = length;
       this.purchaseDate = purchaseDate;

    }

    public boolean isBreeder() {
        return breeder;
    }

    public void setBreeder(boolean breeder) {
        this.breeder = breeder;
    }



    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public BigInteger getWeight() {
        return weight;
    }

    public void setWeight(BigInteger weight) {
        this.weight = weight;
    }

    public BigInteger getLength() {
        return length;
    }

    public void setLength(BigInteger length) {
        this.length = length;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public boolean isShed() {
        return shed;
    }

    public void setShed(boolean shed) {
        this.shed = shed;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
