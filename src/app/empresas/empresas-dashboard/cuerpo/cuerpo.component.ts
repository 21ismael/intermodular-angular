import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmpresaComponent } from '../empresa/empresa.component';
import { Empresa } from '../empresa/empresa';
import { Filtros } from '../filtros/filtros';
import { ActivatedRoute } from '@angular/router';
import { FiltrosService } from '../filtros.service';
import { MatTabsModule } from '@angular/material/tabs';
import { GoogleMap, MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [CommonModule, EmpresaComponent, MatTabsModule, GoogleMap, MapMarker, MapInfoWindow],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.scss'
})
export class CuerpoComponent {
  listaEmpresas: Empresa[] = [];
  empresasFiltradas: Empresa[] = [];

  /* Mapa */

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  empresaMarker?: Empresa;

  center: google.maps.LatLngLiteral = { lat: 39.473805546078054, lng: -0.37558753269930967 };
  zoom = 7;
  display!: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng)
      this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng)
      this.display = event.latLng.toJSON();
  }

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  openInfoWindow(marker: MapMarker) {
    const posicion = marker.marker?.getPosition()?.toJSON();

    this.empresaMarker = this.listaEmpresas.filter(empresa => { return empresa.ubicacion.coordenadas.lat == posicion?.lat &&
      empresa.ubicacion.coordenadas.lng == posicion?.lng})[0];

    this.infoWindow.open(marker);
  }

  constructor(private route: ActivatedRoute, private filtrosService: FiltrosService, private geocoder: MapGeocoder) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ empresas }) => {
      this.listaEmpresas = empresas;

      console.log(this.listaEmpresas);
    });

    this.filtrosService.filtros$.subscribe(filtros => {
      this.aplicarFiltros(filtros);
    });

    for (let empresa of this.empresasFiltradas) {
      this.markerPositions.push({ lat: empresa.ubicacion.coordenadas.lat, lng: empresa.ubicacion.coordenadas.lng })
    }
  }

  aplicarFiltros(filtros: Filtros) {
    if (filtros.provincia) {
      this.geocoder.geocode({
        address: filtros.provincia
      }).subscribe(({ results }) => {
        this.center = results[0].geometry.location.toJSON();
        this.zoom = 10;
      });
    }

    if (filtros.localidad) {
      this.geocoder.geocode({
        address: filtros.localidad
      }).subscribe(({ results }) => {
        this.center = results[0].geometry.location.toJSON();
        this.zoom = 14;
      });
    }

    this.empresasFiltradas = this.listaEmpresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      (filtros.provincia === "" || empresa.ubicacion.provincia.toLowerCase() === filtros.provincia.toLowerCase()) &&
      (filtros.localidad === "" || empresa.ubicacion.localidad.toLowerCase() === filtros.localidad.toLowerCase()) &&
      (filtros.vacantes === "" || empresa.vacantes === +filtros.vacantes || (empresa.vacantes >= 5 && +filtros.vacantes >= 5))
    );

    this.markerPositions = [];

    for (let empresa of this.empresasFiltradas) {
      this.markerPositions.push({ lat: empresa.ubicacion.coordenadas.lat, lng: empresa.ubicacion.coordenadas.lng })
    }
    console.log(this.empresasFiltradas);
    console.log(filtros)
  }

}
