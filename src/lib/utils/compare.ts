// helpers/diff.ts
type AnyObj = Record<string, any>;

function isPrimitive(val: any) {
  return val === null || (typeof val !== "object" && typeof val !== "function");
}

function primitiveEqual(a: any, b: any) {
  // handle number/string equivalence if you want, else strict
  if (typeof a === "number" && typeof b === "string" && b.trim() !== "") {
    return a === Number(b);
  }
  if (typeof b === "number" && typeof a === "string" && a.trim() !== "") {
    return Number(a) === b;
  }
  return a === b;
}

function canonicalize(obj: any) {
  // stable stringify for arrays/objects used as fallback
  return JSON.stringify(obj, Object.keys(obj || {}).sort());
}

function arraysEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;

  // If array of primitives use simple comparison
  if (a.every(isPrimitive) && b.every(isPrimitive)) {
    for (let i = 0; i < a.length; i++) {
      if (!primitiveEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // If items are objects and have `id`, compare by id + shallow fields
  const aAllHaveId = a.every((x) => x && typeof x === "object" && "id" in x);
  const bAllHaveId = b.every((x) => x && typeof x === "object" && "id" in x);

  if (aAllHaveId && bAllHaveId) {
    const mapB = new Map(b.map((it: any) => [String(it.id), it]));
    for (const itemA of a) {
      const itemB = mapB.get(String(itemA.id));
      if (!itemB) return false;
      // quick shallow compare of keys
      if (canonicalize(itemA) !== canonicalize(itemB)) return false;
    }
    return true;
  }

  // Fallback: canonical JSON compare (order sensitive)
  return canonicalize(a) === canonicalize(b);
}

export function getChangedFields(newObj: AnyObj, oldObj: AnyObj): AnyObj {
  const changes: AnyObj = {};

  for (const key of Object.keys(newObj)) {
    const newVal = newObj[key];
    const oldVal = (oldObj ?? {})[key];

    // treat undefined and null carefully
    if (isPrimitive(newVal) && isPrimitive(oldVal)) {
      if (!primitiveEqual(newVal, oldVal)) {
        changes[key] = newVal;
      }
      continue;
    }

    // arrays
    if (Array.isArray(newVal) && Array.isArray(oldVal)) {
      if (!arraysEqual(newVal, oldVal)) {
        changes[key] = newVal;
      }
      continue;
    }

    // objects (non-array)
    if (
      typeof newVal === "object" &&
      newVal !== null &&
      typeof oldVal === "object" &&
      oldVal !== null
    ) {
      const nested = getChangedFields(newVal, oldVal);
      if (Object.keys(nested).length > 0) {
        changes[key] = nested;
      }
      continue;
    }

    // one is object/array and another primitive or mismatch types
    if (canonicalize(newVal) !== canonicalize(oldVal)) {
      changes[key] = newVal;
    }
  }

  return changes;
}
