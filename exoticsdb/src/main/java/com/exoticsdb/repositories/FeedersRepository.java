package com.exoticsdb.repositories;
import com.exoticsdb.models.Feeder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FeedersRepository extends JpaRepository<Feeder, Long>{
    List<Feeder> findByReptileId(Long reptileId);
    Optional<Feeder> findByIdAndReptileId(Long id, Long reptileId);
}
