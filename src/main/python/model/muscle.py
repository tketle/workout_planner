class MuscleRegion(object):
	def __init__(self, name, muscles):
		self._name = name
		self._muscles = muscles

	@property
	def name(self):
		"""The name of the MuscleRegion"""
		return self._name

	@name.setter
	def name(self, name):
		self._name = name

	@name.deleter
	def name(self):
		del self._name

	@property
	def muscles(self):
		"""A list of Muscles that constitute the MuscleRegion"""
		return self._muscles

	@muscles.setter
	def muscles(self, muscles):
		self._muscles = muscles

	@muscles.deleter
	def muscles(self):
		del self._muscles

	def __str__(self):
		return f"<{self._name}: {self._muscles}>"

	def __repr__(self):
		return self.__str__()


class MuscleGroup(object):
	def __init__(self, name, muscle_regions=None):
		self._name = name
		if muscle_regions is None:
			self._muscle_regions = []
		else:
			self._muscle_regions = muscle_regions

	@property
	def name(self):
		"""The name of the MuscleGroup"""
		return self._name

	@name.setter
	def name(self, name):
		self._name = name

	@name.deleter
	def name(self):
		del self._name

	@property
	def muscle_regions(self):
		"""A list of MuscleRegions that constitute the MuscleGroup"""
		return self._muscle_regions

	@muscle_regions.setter
	def muscle_regions(self, muscle_regions):
		self._muscle_regions = muscle_regions

	@muscle_regions.deleter
	def muscle_regions(self):
		del self._muscle_regions

	def add_muscle_region(self, muscle_region):
		self._muscle_regions.append(muscle_region)

	def __str__(self):
		return f"{self._name}: {self._muscle_regions}"

	def __repr__(self):
		return self.__str__()
