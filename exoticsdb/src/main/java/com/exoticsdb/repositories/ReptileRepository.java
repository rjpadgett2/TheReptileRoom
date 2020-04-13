package com.exoticsdb.repositories;

import com.exoticsdb.models.Feeder;
import com.exoticsdb.models.Reptile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReptileRepository extends JpaRepository<Reptile, Long> {
    Reptile findReptileById(Long id);
    List<Reptile> findByUserId(Long userId);
    Optional<Reptile> findByIdAndUserId(Long id, Long userId);
}