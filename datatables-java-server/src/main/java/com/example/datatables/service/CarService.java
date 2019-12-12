package com.example.datatables.service;

import org.springframework.data.domain.Page;

import com.example.datatables.io.entity.Car;
import com.example.datatables.shared.Filter;

public interface CarService {

	Page<Car> getAll(Filter filterDTO);
}
