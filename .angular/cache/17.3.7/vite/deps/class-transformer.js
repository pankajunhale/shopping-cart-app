import "./chunk-J4B6MK7R.js";

// node_modules/class-transformer/esm5/enums/transformation-type.enum.js
var TransformationType;
(function(TransformationType2) {
  TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
  TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
  TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

// node_modules/class-transformer/esm5/MetadataStorage.js
var MetadataStorage = (
  /** @class */
  function() {
    function MetadataStorage2() {
      this._typeMetadatas = /* @__PURE__ */ new Map();
      this._transformMetadatas = /* @__PURE__ */ new Map();
      this._exposeMetadatas = /* @__PURE__ */ new Map();
      this._excludeMetadatas = /* @__PURE__ */ new Map();
      this._ancestorsMap = /* @__PURE__ */ new Map();
    }
    MetadataStorage2.prototype.addTypeMetadata = function(metadata) {
      if (!this._typeMetadatas.has(metadata.target)) {
        this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addTransformMetadata = function(metadata) {
      if (!this._transformMetadatas.has(metadata.target)) {
        this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
        this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
      }
      this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    };
    MetadataStorage2.prototype.addExposeMetadata = function(metadata) {
      if (!this._exposeMetadatas.has(metadata.target)) {
        this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.addExcludeMetadata = function(metadata) {
      if (!this._excludeMetadatas.has(metadata.target)) {
        this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
      }
      this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage2.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
      return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      });
    };
    MetadataStorage2.prototype.findExcludeMetadata = function(target, propertyName) {
      return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadata = function(target, propertyName) {
      return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.findExposeMetadataByCustomName = function(target, name) {
      return this.getExposedMetadatas(target).find(function(metadata) {
        return metadata.options && metadata.options.name === name;
      });
    };
    MetadataStorage2.prototype.findTypeMetadata = function(target, propertyName) {
      return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage2.prototype.getStrategy = function(target) {
      var excludeMap = this._excludeMetadatas.get(target);
      var exclude = excludeMap && excludeMap.get(void 0);
      var exposeMap = this._exposeMetadatas.get(target);
      var expose = exposeMap && exposeMap.get(void 0);
      if (exclude && expose || !exclude && !expose)
        return "none";
      return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage2.prototype.getExposedMetadatas = function(target) {
      return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage2.prototype.getExcludedMetadatas = function(target) {
      return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage2.prototype.getExposedProperties = function(target, transformationType) {
      return this.getExposedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.getExcludedProperties = function(target, transformationType) {
      return this.getExcludedMetadatas(target).filter(function(metadata) {
        if (!metadata.options)
          return true;
        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
          return true;
        if (metadata.options.toClassOnly === true) {
          return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
        }
        if (metadata.options.toPlainOnly === true) {
          return transformationType === TransformationType.CLASS_TO_PLAIN;
        }
        return true;
      }).map(function(metadata) {
        return metadata.propertyName;
      });
    };
    MetadataStorage2.prototype.clear = function() {
      this._typeMetadatas.clear();
      this._exposeMetadatas.clear();
      this._excludeMetadatas.clear();
      this._ancestorsMap.clear();
    };
    MetadataStorage2.prototype.getMetadata = function(metadatas, target) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
          return meta.propertyName !== void 0;
        });
      }
      var metadataFromAncestors = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
          metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
        }
      }
      return metadataFromAncestors.concat(metadataFromTarget || []);
    };
    MetadataStorage2.prototype.findMetadata = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      if (metadataFromTargetMap) {
        var metadataFromTarget = metadataFromTargetMap.get(propertyName);
        if (metadataFromTarget) {
          return metadataFromTarget;
        }
      }
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          var ancestorResult = ancestorMetadataMap.get(propertyName);
          if (ancestorResult) {
            return ancestorResult;
          }
        }
      }
      return void 0;
    };
    MetadataStorage2.prototype.findMetadatas = function(metadatas, target, propertyName) {
      var metadataFromTargetMap = metadatas.get(target);
      var metadataFromTarget;
      if (metadataFromTargetMap) {
        metadataFromTarget = metadataFromTargetMap.get(propertyName);
      }
      var metadataFromAncestorsTarget = [];
      for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
        var ancestor = _a[_i];
        var ancestorMetadataMap = metadatas.get(ancestor);
        if (ancestorMetadataMap) {
          if (ancestorMetadataMap.has(propertyName)) {
            metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
          }
        }
      }
      return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
    };
    MetadataStorage2.prototype.getAncestors = function(target) {
      if (!target)
        return [];
      if (!this._ancestorsMap.has(target)) {
        var ancestors = [];
        for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
          ancestors.push(baseClass);
        }
        this._ancestorsMap.set(target, ancestors);
      }
      return this._ancestorsMap.get(target);
    };
    return MetadataStorage2;
  }()
);

// node_modules/class-transformer/esm5/storage.js
var defaultMetadataStorage = new MetadataStorage();

// node_modules/class-transformer/esm5/utils/get-global.util.js
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
}

// node_modules/class-transformer/esm5/utils/is-promise.util.js
function isPromise(p) {
  return p !== null && typeof p === "object" && typeof p.then === "function";
}

// node_modules/class-transformer/esm5/TransformOperationExecutor.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function instantiateArrayType(arrayType) {
  var array = new arrayType();
  if (!(array instanceof Set) && !("push" in array)) {
    return [];
  }
  return array;
}
var TransformOperationExecutor = (
  /** @class */
  function() {
    function TransformOperationExecutor2(transformationType, options) {
      this.transformationType = transformationType;
      this.options = options;
      this.recursionStack = /* @__PURE__ */ new Set();
    }
    TransformOperationExecutor2.prototype.transform = function(source, value, targetType, arrayType, isMap, level) {
      var _this = this;
      if (level === void 0) {
        level = 0;
      }
      if (Array.isArray(value) || value instanceof Set) {
        var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
        value.forEach(function(subValue, index) {
          var subSource = source ? source[index] : void 0;
          if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
            var realTargetType = void 0;
            if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
              if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                realTargetType = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.name === subValue[targetType.options.discriminator.property];
                });
                var options = { newObject: newValue_1, object: subValue, property: void 0 };
                var newType = targetType.typeFunction(options);
                realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                if (!targetType.options.keepDiscriminatorProperty)
                  delete subValue[targetType.options.discriminator.property];
              }
              if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                realTargetType = subValue.constructor;
              }
              if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function(subType) {
                  return subType.value === subValue.constructor;
                }).name;
              }
            } else {
              realTargetType = targetType;
            }
            var value_1 = _this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
            if (newValue_1 instanceof Set) {
              newValue_1.add(value_1);
            } else {
              newValue_1.push(value_1);
            }
          } else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
            if (newValue_1 instanceof Set) {
              newValue_1.add(subValue);
            } else {
              newValue_1.push(subValue);
            }
          }
        });
        return newValue_1;
      } else if (targetType === String && !isMap) {
        if (value === null || value === void 0)
          return value;
        return String(value);
      } else if (targetType === Number && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Number(value);
      } else if (targetType === Boolean && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Boolean(value);
      } else if ((targetType === Date || value instanceof Date) && !isMap) {
        if (value instanceof Date) {
          return new Date(value.valueOf());
        }
        if (value === null || value === void 0)
          return value;
        return new Date(value);
      } else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
        if (value === null || value === void 0)
          return value;
        return Buffer.from(value);
      } else if (isPromise(value) && !isMap) {
        return new Promise(function(resolve, reject) {
          value.then(function(data) {
            return resolve(_this.transform(void 0, data, targetType, void 0, void 0, level + 1));
          }, reject);
        });
      } else if (!isMap && value !== null && typeof value === "object" && typeof value.then === "function") {
        return value;
      } else if (typeof value === "object" && value !== null) {
        if (!targetType && value.constructor !== Object)
          if (!Array.isArray(value) && value.constructor === Array) {
          } else {
            targetType = value.constructor;
          }
        if (!targetType && source)
          targetType = source.constructor;
        if (this.options.enableCircularCheck) {
          this.recursionStack.add(value);
        }
        var keys = this.getKeys(targetType, value, isMap);
        var newValue = source ? source : {};
        if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
          if (isMap) {
            newValue = /* @__PURE__ */ new Map();
          } else if (targetType) {
            newValue = new targetType();
          } else {
            newValue = {};
          }
        }
        var _loop_1 = function(key2) {
          if (key2 === "__proto__" || key2 === "constructor") {
            return "continue";
          }
          var valueKey = key2;
          var newValueKey = key2, propertyName = key2;
          if (!this_1.options.ignoreDecorators && targetType) {
            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key2);
              if (exposeMetadata) {
                propertyName = exposeMetadata.propertyName;
                newValueKey = exposeMetadata.propertyName;
              }
            } else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key2);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                newValueKey = exposeMetadata.options.name;
              }
            }
          }
          var subValue = void 0;
          if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
            subValue = value[valueKey];
          } else {
            if (value instanceof Map) {
              subValue = value.get(valueKey);
            } else if (value[valueKey] instanceof Function) {
              subValue = value[valueKey]();
            } else {
              subValue = value[valueKey];
            }
          }
          var type = void 0, isSubValueMap = subValue instanceof Map;
          if (targetType && isMap) {
            type = targetType;
          } else if (targetType) {
            var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
            if (metadata_1) {
              var options = { newObject: newValue, object: value, property: propertyName };
              var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
              if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                if (!(value[valueKey] instanceof Array)) {
                  if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                    type = metadata_1.options.discriminator.subTypes.find(function(subType) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        return subType.name === subValue[metadata_1.options.discriminator.property];
                      }
                    });
                    type === void 0 ? type = newType : type = type.value;
                    if (!metadata_1.options.keepDiscriminatorProperty) {
                      if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                        delete subValue[metadata_1.options.discriminator.property];
                      }
                    }
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                    type = subValue.constructor;
                  }
                  if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                    if (subValue) {
                      subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function(subType) {
                        return subType.value === subValue.constructor;
                      }).name;
                    }
                  }
                } else {
                  type = metadata_1;
                }
              } else {
                type = newType;
              }
              isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
            } else if (this_1.options.targetMaps) {
              this_1.options.targetMaps.filter(function(map) {
                return map.target === targetType && !!map.properties[propertyName];
              }).forEach(function(map) {
                return type = map.properties[propertyName];
              });
            } else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
              if (reflectedType) {
                type = reflectedType;
              }
            }
          }
          var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : void 0;
          var subSource = source ? source[valueKey] : void 0;
          if (newValue.constructor.prototype) {
            var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
            if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
            (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
              return "continue";
          }
          if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
            var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key2;
            var finalValue = void 0;
            if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
              finalValue = value[transformKey];
              finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              finalValue = value[transformKey] === finalValue ? subValue : finalValue;
              finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
            } else {
              if (subValue === void 0 && this_1.options.exposeDefaultValues) {
                finalValue = newValue[newValueKey];
              } else {
                finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
              }
            }
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          } else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
            var finalValue = subValue;
            finalValue = this_1.applyCustomTransformations(finalValue, targetType, key2, value, this_1.transformationType);
            if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
              if (newValue instanceof Map) {
                newValue.set(newValueKey, finalValue);
              } else {
                newValue[newValueKey] = finalValue;
              }
            }
          }
        };
        var this_1 = this;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          _loop_1(key);
        }
        if (this.options.enableCircularCheck) {
          this.recursionStack.delete(value);
        }
        return newValue;
      } else {
        return value;
      }
    };
    TransformOperationExecutor2.prototype.applyCustomTransformations = function(value, target, key, obj, transformationType) {
      var _this = this;
      var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
      if (this.options.version !== void 0) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkVersion(metadata.options.since, metadata.options.until);
        });
      }
      if (this.options.groups && this.options.groups.length) {
        metadatas = metadatas.filter(function(metadata) {
          if (!metadata.options)
            return true;
          return _this.checkGroups(metadata.options.groups);
        });
      } else {
        metadatas = metadatas.filter(function(metadata) {
          return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
        });
      }
      metadatas.forEach(function(metadata) {
        value = metadata.transformFn({ value, key, obj, type: transformationType, options: _this.options });
      });
      return value;
    };
    TransformOperationExecutor2.prototype.isCircular = function(object) {
      return this.recursionStack.has(object);
    };
    TransformOperationExecutor2.prototype.getReflectedType = function(target, propertyName) {
      if (!target)
        return void 0;
      var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
      return meta ? meta.reflectedType : void 0;
    };
    TransformOperationExecutor2.prototype.getKeys = function(target, object, isMap) {
      var _this = this;
      var strategy = defaultMetadataStorage.getStrategy(target);
      if (strategy === "none")
        strategy = this.options.strategy || "exposeAll";
      var keys = [];
      if (strategy === "exposeAll" || isMap) {
        if (object instanceof Map) {
          keys = Array.from(object.keys());
        } else {
          keys = Object.keys(object);
        }
      }
      if (isMap) {
        return keys;
      }
      if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        keys = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
      }
      if (!this.options.ignoreDecorators && target) {
        var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
        if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
          exposedProperties = exposedProperties.map(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
              return exposeMetadata.options.name;
            }
            return key;
          });
        }
        if (this.options.excludeExtraneousValues) {
          keys = exposedProperties;
        } else {
          keys = keys.concat(exposedProperties);
        }
        var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
        if (excludedProperties_1.length > 0) {
          keys = keys.filter(function(key) {
            return !excludedProperties_1.includes(key);
          });
        }
        if (this.options.version !== void 0) {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            if (!exposeMetadata || !exposeMetadata.options)
              return true;
            return _this.checkGroups(exposeMetadata.options.groups);
          });
        } else {
          keys = keys.filter(function(key) {
            var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
            return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
          });
        }
      }
      if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
        keys = keys.filter(function(key) {
          return _this.options.excludePrefixes.every(function(prefix) {
            return key.substr(0, prefix.length) !== prefix;
          });
        });
      }
      keys = keys.filter(function(key, index, self2) {
        return self2.indexOf(key) === index;
      });
      return keys;
    };
    TransformOperationExecutor2.prototype.checkVersion = function(since, until) {
      var decision = true;
      if (decision && since)
        decision = this.options.version >= since;
      if (decision && until)
        decision = this.options.version < until;
      return decision;
    };
    TransformOperationExecutor2.prototype.checkGroups = function(groups) {
      if (!groups)
        return true;
      return this.options.groups.some(function(optionGroup) {
        return groups.includes(optionGroup);
      });
    };
    return TransformOperationExecutor2;
  }()
);

// node_modules/class-transformer/esm5/constants/default-options.constant.js
var defaultOptions = {
  enableCircularCheck: false,
  enableImplicitConversion: false,
  excludeExtraneousValues: false,
  excludePrefixes: void 0,
  exposeDefaultValues: false,
  exposeUnsetFields: true,
  groups: void 0,
  ignoreDecorators: false,
  strategy: void 0,
  targetMaps: void 0,
  version: void 0
};

// node_modules/class-transformer/esm5/ClassTransformer.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var ClassTransformer = (
  /** @class */
  function() {
    function ClassTransformer2() {
    }
    ClassTransformer2.prototype.instanceToPlain = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToPlainFromExist = function(object, plainObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
      return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToInstance = function(cls, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.plainToClassFromExist = function(clsObject, plain, options) {
      var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.instanceToInstance = function(object, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.classToClassFromExist = function(object, fromObject, options) {
      var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
      return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
    };
    ClassTransformer2.prototype.serialize = function(object, options) {
      return JSON.stringify(this.instanceToPlain(object, options));
    };
    ClassTransformer2.prototype.deserialize = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    ClassTransformer2.prototype.deserializeArray = function(cls, json, options) {
      var jsonObject = JSON.parse(json);
      return this.plainToInstance(cls, jsonObject, options);
    };
    return ClassTransformer2;
  }()
);

// node_modules/class-transformer/esm5/decorators/exclude.decorator.js
function Exclude(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExcludeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/expose.decorator.js
function Expose(options) {
  if (options === void 0) {
    options = {};
  }
  return function(object, propertyName) {
    defaultMetadataStorage.addExposeMetadata({
      target: object instanceof Function ? object : object.constructor,
      propertyName,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/transform-instance-to-instance.decorator.js
function TransformInstanceToInstance(params) {
  return function(target, propertyKey, descriptor) {
    var classTransformer2 = new ClassTransformer();
    var originalMethod = descriptor.value;
    descriptor.value = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var result = originalMethod.apply(this, args);
      var isPromise2 = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
      return isPromise2 ? result.then(function(data) {
        return classTransformer2.instanceToInstance(data, params);
      }) : classTransformer2.instanceToInstance(result, params);
    };
  };
}

// node_modules/class-transformer/esm5/decorators/transform-instance-to-plain.decorator.js
function TransformInstanceToPlain(params) {
  return function(target, propertyKey, descriptor) {
    var classTransformer2 = new ClassTransformer();
    var originalMethod = descriptor.value;
    descriptor.value = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var result = originalMethod.apply(this, args);
      var isPromise2 = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
      return isPromise2 ? result.then(function(data) {
        return classTransformer2.instanceToPlain(data, params);
      }) : classTransformer2.instanceToPlain(result, params);
    };
  };
}

// node_modules/class-transformer/esm5/decorators/transform-plain-to-instance.decorator.js
function TransformPlainToInstance(classType, params) {
  return function(target, propertyKey, descriptor) {
    var classTransformer2 = new ClassTransformer();
    var originalMethod = descriptor.value;
    descriptor.value = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var result = originalMethod.apply(this, args);
      var isPromise2 = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
      return isPromise2 ? result.then(function(data) {
        return classTransformer2.plainToInstance(classType, data, params);
      }) : classTransformer2.plainToInstance(classType, result, params);
    };
  };
}

// node_modules/class-transformer/esm5/decorators/transform.decorator.js
function Transform(transformFn, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, propertyName) {
    defaultMetadataStorage.addTransformMetadata({
      target: target.constructor,
      propertyName,
      transformFn,
      options
    });
  };
}

// node_modules/class-transformer/esm5/decorators/type.decorator.js
function Type(typeFunction, options) {
  if (options === void 0) {
    options = {};
  }
  return function(target, propertyName) {
    var reflectedType = Reflect.getMetadata("design:type", target, propertyName);
    defaultMetadataStorage.addTypeMetadata({
      target: target.constructor,
      propertyName,
      reflectedType,
      typeFunction,
      options
    });
  };
}

// node_modules/class-transformer/esm5/index.js
var classTransformer = new ClassTransformer();
function classToPlain(object, options) {
  return classTransformer.instanceToPlain(object, options);
}
function instanceToPlain(object, options) {
  return classTransformer.instanceToPlain(object, options);
}
function classToPlainFromExist(object, plainObject, options) {
  return classTransformer.classToPlainFromExist(object, plainObject, options);
}
function plainToClass(cls, plain, options) {
  return classTransformer.plainToInstance(cls, plain, options);
}
function plainToInstance(cls, plain, options) {
  return classTransformer.plainToInstance(cls, plain, options);
}
function plainToClassFromExist(clsObject, plain, options) {
  return classTransformer.plainToClassFromExist(clsObject, plain, options);
}
function instanceToInstance(object, options) {
  return classTransformer.instanceToInstance(object, options);
}
function classToClassFromExist(object, fromObject, options) {
  return classTransformer.classToClassFromExist(object, fromObject, options);
}
function serialize(object, options) {
  return classTransformer.serialize(object, options);
}
function deserialize(cls, json, options) {
  return classTransformer.deserialize(cls, json, options);
}
function deserializeArray(cls, json, options) {
  return classTransformer.deserializeArray(cls, json, options);
}
export {
  ClassTransformer,
  Exclude,
  Expose,
  Transform,
  TransformInstanceToInstance,
  TransformInstanceToPlain,
  TransformPlainToInstance,
  TransformationType,
  Type,
  classToClassFromExist,
  classToPlain,
  classToPlainFromExist,
  deserialize,
  deserializeArray,
  instanceToInstance,
  instanceToPlain,
  plainToClass,
  plainToClassFromExist,
  plainToInstance,
  serialize
};
//# sourceMappingURL=class-transformer.js.map
