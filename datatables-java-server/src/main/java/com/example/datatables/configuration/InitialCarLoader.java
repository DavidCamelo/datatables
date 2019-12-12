package com.example.datatables.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.example.datatables.io.entity.Car;
import com.example.datatables.io.repository.CarRepository;

@Component
public class InitialCarLoader implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	@Lazy
	private CarRepository carRepository;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		for (Long id = 0L; id < 10_000; id++) {
			Car car = new Car();
			car.setId(id);
			car.setCarName("CarName" + id);
			carRepository.save(car);
		}
	}
}
