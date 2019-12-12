package com.example.datatables.io.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.datatables.io.entity.Car;

@Repository
public interface CarRepository extends PagingAndSortingRepository<Car, Long> {

	Page<Car> findAllByCarNameContainsIgnoreCase(String carName, Pageable pageable);
}
