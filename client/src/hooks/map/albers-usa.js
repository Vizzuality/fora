/* eslint-disable */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-geo')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-geo'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.geoAlbersUsaTerritories = {}, global.d3));
}(this, (function (exports, d3Geo) { 'use strict';

  var epsilon = 0.000001;

  function multiplex(streams) {
    return {
      point(x, y) {
        for (const s of streams) s.point(x, y);
      },
      sphere() {
        for (const s of streams) s.sphere();
      },
      lineStart() {
        for (const s of streams) s.lineStart();
      },
      lineEnd() {
        for (const s of streams) s.lineEnd();
      },
      polygonStart() {
        for (const s of streams) s.polygonStart();
      },
      polygonEnd() {
        for (const s of streams) s.polygonEnd();
      },
    };
  }

  function geoAlbersUsaTerritories() {
    var cache,
      cacheStream,
      lower48 = d3Geo.geoAlbers(),
      lower48Point,
      alaska = d3Geo.geoConicEqualArea()
        .rotate([154, 0])
        .center([-2, 58.5])
        .parallels([55, 65]),
      alaskaPoint,
      hawaii = d3Geo.geoConicEqualArea()
        .rotate([157, 0])
        .center([-3, 19.9])
        .parallels([8, 18]),
      hawaiiPoint,
      puertoRico = d3Geo.geoConicEqualArea()
        .rotate([66, 0])
        .center([0, 18])
        .parallels([8, 18]),
      puertoRicoPoint,
      guamMariana = d3Geo.geoConicEqualArea()
        .rotate([-145, 0])
        .center([0, 16])
        .parallels([10, 20]),
      guamMarianaPoint,
      americanSamoa = d3Geo.geoConicEqualArea()
        .rotate([170, 0])
        .center([0, -14])
        .parallels([-14, 0]),
      americanSamoaPoint,
      point,
      pointStream = {
        point: function (x, y) {
          point = [x, y];
        },
      };

    function albersUsaTerritories(coordinates) {
      var x = coordinates[0],
        y = coordinates[1];
      return (
        (point = null),
        (lower48Point.point(x, y), point) ||
          (alaskaPoint.point(x, y), point) ||
          (hawaiiPoint.point(x, y), point) ||
          (puertoRicoPoint.point(x, y), point) ||
          (guamMarianaPoint.point(x, y), point) ||
          (americanSamoaPoint.point(x, y), point)
      );
    }

    albersUsaTerritories.invert = function (coordinates) {
      var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
      return (y >= 0.12 && y < 0.234 && x >= -0.225 && x < -0.185
        ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.185 && x < -0.08
        ? hawaii
        : y >= 0.204 && y < 0.234 && x >= 0.3 && x < 0.38
        ? puertoRico
        : y >= 0.05 && y < 0.204 && x >= -0.415 && x < -0.225
        ? guamMariana
        : y >= 0.18 && y < 0.234 && x >= -0.415 && x < -0.225
        ? americanSamoa
        : lower48
      ).invert(coordinates);
    };

    albersUsaTerritories.stream = function (stream) {
      return cache && cacheStream === stream
        ? cache
        : (cache = multiplex([
            lower48.stream((cacheStream = stream)),
            alaska.stream(stream),
            hawaii.stream(stream),
            puertoRico.stream(stream),
            guamMariana.stream(stream),
            americanSamoa.stream(stream),
          ]));
    };

    albersUsaTerritories.precision = function (_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      puertoRico.precision(_);
      guamMariana.precision(_);
      americanSamoa.precision(_);
      return reset();
    };

    albersUsaTerritories.scale = function (_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * 0.35);
      hawaii.scale(_);
      puertoRico.scale(_);
      guamMariana.scale(_);
      americanSamoa.scale(_);
      return albersUsaTerritories.translate(lower48.translate());
    };

    albersUsaTerritories.translate = function (_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(),
        x = +_[0],
        y = +_[1];

      lower48Point = lower48
        .translate(_)
        .clipExtent([
          [x - 0.455 * k, y - 0.238 * k],
          [x + 0.455 * k, y + 0.238 * k],
        ])
        .stream(pointStream);

      alaskaPoint = alaska
        .translate([x - 0.275 * k, y + 0.201 * k])
        .clipExtent([
          [x - 0.425 * k + epsilon, y + 0.12 * k + epsilon],
          [x - 0.185 * k - epsilon, y + 0.234 * k - epsilon],
        ])
        .stream(pointStream);

      hawaiiPoint = hawaii
        .translate([x - 0.18 * k, y + 0.212 * k])
        .clipExtent([
          [x - 0.185 * k + epsilon, y + 0.166 * k + epsilon],
          [x - 0.08 * k - epsilon, y + 0.234 * k - epsilon],
        ])
        .stream(pointStream);

      puertoRicoPoint = puertoRico
        .translate([x + 0.335 * k, y + 0.224 * k])
        .clipExtent([
          [x + 0.3 * k, y + 0.204 * k],
          [x + 0.38 * k, y + 0.234 * k],
        ])
        .stream(pointStream);

      guamMarianaPoint = guamMariana
        .translate([x - 0.115 * k, y + 0.14 * k])
        .clipExtent([
          [x - 0.45 * k, y + 0.05 * k],
          [x - 0.39 * k, y + 0.21 * k],
        ])
        .stream(pointStream);

      americanSamoaPoint = americanSamoa
        .translate([x - 0.35 * k, y + 0.115 * k])
        .clipExtent([
          [x - 0.45 * k, y + 0.1 * k],
          [x - 0.30 * k, y + 0.234 * k],
        ])
        .stream(pointStream);
      return reset();
    };

    function reset() {
      cache = cacheStream = null;
      return albersUsaTerritories;
    }

    return albersUsaTerritories.scale(1070);
  }

  exports.geoAlbersUsaTerritories = geoAlbersUsaTerritories;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
