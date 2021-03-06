# Constraints
Constraints are one of the core parts of any mass-spring (or mass-aggregate) physics engine. This simple physics engine features six distinct types of constraints.
## Defining a Constraint
Each constraint has four core properties. These are:
* .one - This is the first node connected by the constraint.
* .two - This is the second node connected by the constraint.
* .rigidity - This defines how rigid the constraint is. The force applied by "spring" effects is multiplied by this.
* .length - This is how long the constraint is; the length it tries to conform to.
## Constraint Types
The six constraint types are:
* `Spring` - This is the simplest form of constraint. All it does is apply a force encouraging the nodes to the correct length, with the force proportional to how displaced the nodes are. This is a "spring" effect.
* `Rod` - This is essentially a spring, with compensation for extreme rigidity as well as a spring effect. When configured correctly, this is nearly rigid.
* `Bungee` - This is essentially a spring, but it only applies a spring effect if the distance between the nodes is *greater* than the length.
* `Cord` - The Bungee equivalent of the Rod, this has a Rod's physical effect but it only applies when the distance is greater than the constraint's length.
* `Compressor` - This is the same as a bungee, but it only applies the spring effect if the distance between the nodes is *less* than the constraint's length.
* `Extender` - The Compressor equivalent of the Rod, this does everything the Rod does, but only when the distance is *less* than the constraint's length.
## Constraint Tips
* Don't use ridiculous lengths. Bad glitches can be caused in situations where, for example, two very close circles are constrained by a spring with a huge length and a lot of rigidity.
* Don't use ridiculous rigidity. Though there is some built in compensation for vibration, it'll still happen if you force it to. Always keep it under 50.
* Don't have conflicting constraints. This essentially means that you should make each circle **able** to fit into the shape that the constraints want it to. If you have one constraint with a ridiculous length, and the others have a much smaller length, it may form an impossible shape, which is unpredictable and should be (and always can be) avoided.
