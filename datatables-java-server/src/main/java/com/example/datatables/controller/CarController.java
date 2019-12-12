package com.example.datatables.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.datatables.io.entity.Car;
import com.example.datatables.service.CarService;
import com.example.datatables.shared.Filter;

@RestController
@RequestMapping("/car")
public class CarController {

	@Autowired
	@Lazy
	private CarService carService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public Page<Car> getAll(Filter filterDTO) {
		return carService.getAll(filterDTO);
	}

}
